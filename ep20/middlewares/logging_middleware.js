import fs from "fs";

function loggingMiddleware(req, res, next) {
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
}

export default loggingMiddleware;