import errorHandler from "errorhandler";

import app from "./app";
import { httpServer } from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

const PORT = app.get("port");
/**
 * Start Express server.
 */
httpServer.listen(PORT, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        PORT,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default httpServer;
