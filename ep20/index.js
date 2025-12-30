import express from "express";

// database conncetion
import createConnection from "./connection.js";
// routes
import userRouter from "./routes/user_routes.js"
// middleware
import loggingMiddleware from "./middlewares/logging_middleware.js";

const app = express();
const PORT = 8080;
const MONGO_DB = "mongodb://localhost:27017/road-to-node";

// middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Home route
app.get("/", (req, res) => {
    return res.send("Hello");
});

// User Routes
app.use("/users", userRouter);

// connecting to MONGO_DB
createConnection(MONGO_DB);
app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`);
});
