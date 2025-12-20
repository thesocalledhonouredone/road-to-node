/*

npm init (or) npm init -y
npm install express (or) npm i express

*/

import express from "express";
import fs from "node:fs/promises";
//import data from "./data.json" with { type: "json" }; to work with json data cached

const app = express();
const PORT = 8080;

/*

Design Assignment
REST API - JSON Response

GET /users - List all users
GET /users/id - Get user by ID
POST /users - Create a new user
PATCH /users/id - Edit user by ID
DELETE /users/id - Delete user by ID

*/


// middlewares
app.use(express.json());

// defining custom middleware
// app.use(() => { // handler function can be passed to do somthing before endpoint
//     console.log("This is middleware 1");
// });

// proper definition of middleware
app.use((req, res, next) => {
    // some code...
    console.log("This is middleware 2");
    next();
});

// logging middleware
app.use((req, res, next) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();

    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const milli = date.getMilliseconds().toString();

    const logEntry = `${year}.${month}.${day}-${hour}:${minute}:${seconds}:${milli} - ${req.method} ${req.path}\n`;
    fs.appendFile("./logging.log", logEntry, (err) => {
        if (err) {
            console.log("Error: ", err);
            return res.json({ "message": "Website not Avilable" });
        }
    });
    next();
});


// method to read data from json file
async function readData() {
  const jsonString = await fs.readFile("./data.json", "utf-8");
  return JSON.parse(jsonString);
}

// method to write data to json file
async function writeData(data) {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile("./data.json", jsonString, "utf-8");
}


// endpoints
app.get("/", (req, res) => {
    res.setHeader("myName", "anirudh"); // setting new header
    //always add 'X' to custom header
    res.setHeader("X-from", "myApplication");
    // req.headers to access the request headers
    return res.json({
        "page": "Home Page"
    });
});

app.get("/users", async (req, res) => { //GET /users - List all users
    const data = await readData();
    return res.json(data);
})

app.get("/users/:userId", async (req, res) => { // GET /users/id - Get user by ID
    const id = Number(req.params.userId);
    const data = await readData();
    const user = data.find(user => user.id === id); 

    if (!user) {
        return res.status(404).json({ "message": "User Not Found" });
    }

    return res.json(user);
})

app.post("/users", async (req, res) => { // POST /users - Create a new user
    const { first_name, last_name, email, job_title } = req.body;
    const data = await readData();
    const newId = data.at(-1).id + 1;

    data.push({
        "id": newId,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "job_title": job_title
    });
    await writeData(data);

    return res.json({ "first_name": first_name, "email": email });
});

app.patch("/users/:userId", async (req, res) => { // PATCH /users/id - Edit user by ID
    const userId = Number(req.params.userId);
    const { first_name, last_name, email, job_title } = req.body;

    const data = await readData();
    const user = data.find(user => user.id == userId);

    if (!user) {
        res.status(404).json({ "message": "User Not Found"});
    }

    if (first_name !== undefined) {
        user["first_name"] = first_name;
    }
    if (last_name !== undefined) {
        user["last_name"] = last_name;
    }
    if (email !== undefined) {
        user["email"] = email;
    }
    if (job_title !== undefined) {
        user["job_title"] = job_title;
    }

    await writeData(data);
    return res.json(user);
});

app.delete("/users/:userId", async (req, res) => { // DELETE /users/id - Delete user by ID
    const userId = Number(req.params.userId);
    const data = await readData();
    const user = data.find(user => user.id == userId);
   
    if (!user) {
        return res.status(404).json({ "message": "User Not Found" });
    }

    const index = data.indexOf(user);
    const deletedUser = data.splice(index, 1)[0];
    await writeData(data);
    return res.json(user);
});

app.listen(PORT, () => console.log(`Server has started on http://localhost:${PORT}`));
