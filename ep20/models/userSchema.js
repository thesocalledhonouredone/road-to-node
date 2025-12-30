import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // defining a schema
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema); // creating a Model from that Schema
export default User; // exporing the model to use for CRUD operations
