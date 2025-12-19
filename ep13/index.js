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

// method to read data from json file
async function readData() {
  const jsonString = await fs.readFile("./data.json", "utf-8");
  return JSON.parse(jsonString);
}


// endpoints
app.get("/", (req, res) => {
    res.json({
        "page": "Home Page"
    });
});

app.get("/users", async (req, res) => { //GET /users - List all users
    const data = await readData();
    return res.json(data);
})

app.get("/users/:userId", async (req, res) => {
    const id = Number(req.params.userId);
    const data = await readData();
    const user = data.find(user => user.id === id); 
    return res.json(user);
})

app.post("/users", async (req, res) => {
    
});

app.put("/users/:userId", async (req, res) => {

});

app.delete("/users/:userID", (req, res) => {
    
})

app.listen(PORT, () => console.log(`Server has started on http://localhost:${PORT}`));
