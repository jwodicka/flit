
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
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";
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
app.get("/", homeController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);
// app.post("/forgot", userController.postForgot);
// app.get("/reset/:token", userController.getReset);
// app.post("/reset/:token", userController.postReset);
app.get("/signup", userController.getSignup);
app.post("/signup", userController.postSignup);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
// app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get("/api", apiController.getApi);
// app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });

export default app;
