import http from 'http';
import fs from "fs";

const server = http.createServer((req, res) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const hrs = date.getHours().toString();
    const mins = date.getMinutes().toString();
    const sec = date.getSeconds().toString();
    

    const formattedDate = `${year}/${month}/${day} - ${hrs}:${mins}:${sec}`;
    fs.appendFile("logFile.txt", formattedDate + "\n", (err) => {
        console.log(err);
    });
    res.end("Server...");

});

let PORT = 8000;
server.listen(PORT, () => {
    console.log(`Sever Running on: http://localhost:${PORT}`);
});