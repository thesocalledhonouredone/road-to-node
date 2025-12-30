import mongoose from "mongoose";

async function createConnection(connection_string) {
    return mongoose // like so we connect to mongodb
    .connect(connection_string)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
}

export default createConnection;
