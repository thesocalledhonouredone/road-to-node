/*

Majorly 5 HTTP methods
GET, PUT, POST, PATCH, DELETE

1. GET: getting some data from the server
2. PUT: sending some data to the server, new resource creation
3. POST: update or replace an existing resource (create new resource if it does not exist) 
4. PATCH: apply partial modifications to an existing resource
5. DELETE: delete an existing resource 

*/

import http from 'http';
import fs from "fs";
import url from "url";

const server = http.createServer((req, res) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const hrs = date.getHours().toString();
    const mins = date.getMinutes().toString();
    const sec = date.getSeconds().toString();

    if (req.url == "/favicon.ico") { // to avoid "/favicon" route in log file
            return res.end();
    }
    
    const parsed_url = url.parse(req.url, true); // to parse the url 

    const formattedDate = `${year}/${month}/${day}-${hrs}:${mins}:${sec} - ${parsed_url.path} - ${req.method}`;
    fs.appendFile("logFile.txt", formattedDate + "\n", (err) => {

        switch (parsed_url.pathname) {
            case "/":
                res.end("HOME PAGE");
                break;
            
            case "/about":
                res.end("ABOUT PAGE");
                break;

            case "/contact-us":
                res.end("CONTACT PAGE");
                break;

            case "/users":
                const user_name = parsed_url.query.u;
                res.end(`Welcome Back, ${user_name}`);
                break;

            default:
                res.end("404: NOT FOUND");
                break;
        }

        if (err) {
            console.log(err);
        }
    });
});

let PORT = 8000;
server.listen(PORT, () => {
    console.log(`Sever Running on: http://localhost:${PORT}`);
});