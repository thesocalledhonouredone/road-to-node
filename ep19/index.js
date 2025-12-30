import express from "express";
import mongoose from "mongoose";

// models
import User from "./userSchema.js";

import loggingMiddleware from "./logging.js";

const app = express();
const PORT = 8080;
const MONGO_DB = "mongodb://localhost:27017/road-to-node";

// middlewares
app.use(express.json());
app.use(loggingMiddleware);

mongoose // like so we connect to mongodb
.connect(MONGO_DB)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Error: ", err);
});

app.get("/", (req, res) => {
    return res.send("Hello");
});

app.get("/users", async (req, res) => {
    const data = await User.find({})
    return res.json(data);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
        return res.json(user);
    }
    return res.json({ "message": "user not found"});
});

app.post("/users", async (req, res) => {
    const { firstName, lastName, email, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !jobTitle) {
        return res.json({ "message": "Invalid Input" });
    }

    const result = await User.create ({firstName, lastName, email, jobTitle});
    return res.json({"firstName": firstName, "email": email});
});

app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({"message": "User Not Found"});
    }

    const { firstName, lastName, email, jobTitle } = req.body;
    if (firstName !== undefined) {
        user.firstName = firstName;
    }
    if (lastName !== undefined) {
        user.lastName = lastName;
    }
    if (email !== undefined) {
        user.email = email;
    }
    if (jobTitle !== undefined) {
        user.jobTitle = jobTitle;
    }

    await user.save();
    return res.json(user);
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({"message": "User Not Found"});
    }
    return res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`);
});
