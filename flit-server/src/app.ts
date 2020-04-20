
import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import connectSqlite from "connect-sqlite3";
import flash from "express-flash";
import fs from "fs";
import path from "path";
import passport from "passport";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { SESSION_SECRET } from "./util/secrets";

const SQLiteStore = connectSqlite(session);

// Controllers (route handlers)
import * as userController from "./controllers/user";
import { Context, resolvers } from "./controllers/graphql-resolver";

// models
import { typeDefs } from "./types/schema";
import { StubChat } from "./models/Chat";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

let store = null;
if (process.env.NODE_ENV === "test") {
    store = new SQLiteStore({
        table: "sessions",
        db: ":memory:",
    });
} else {
    // SQLite needs a place to put its DB files before we get going.
    // Once we start consolidating SQLite logic, this should stay with it.
    const dbDir = path.join(__dirname, "../db");

    if (!fs.existsSync(dbDir)){
        fs.mkdirSync(dbDir);
    }

    store = new SQLiteStore({
        table: "sessions",
        db: "sessions.sqlite",
        dir: dbDir,
    });
}


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/^\/graphql/) &&
    !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
    req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * GraphQL support
 */
const context: Context = {
    models: {
        chatModel: new StubChat(),
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});
server.applyMiddleware({ app, path: "/graphql", });
export const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

/**
 * Primary app routes.
 */
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/signup", userController.getSignup);
app.post("/signup", userController.postSignup);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);

export default app;
