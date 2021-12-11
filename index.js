const express = require("express");
const fs = require("fs");

const app = express();

const currentDateTime = () => {
    const dateNow = new Date();

    return (
        String(dateNow.getFullYear()) +
        String(dateNow.getMonth()) +
        String(dateNow.getDate()) +
        "." +
        String(dateNow.getTime())
    );
};

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/create-file/", (req, res) => {
    const fileName = currentDateTime();
    const currentTime = String(new Date().getTime());

    console.log(fileName, currentTime);

    fs.writeFile(`./files/${fileName}.txt`, currentTime, (err) => {
        if (err) {
            res.send("Something went wrong...");
        } else {
            res.send("File written successfully...");
        }
    });
});

app.get("/get-files/", (req, res) => {
    fs.readdir("./files/", (err, data) => {
        console.log(data);
        res.send(data);
    });
});
app.listen(5000, () => console.log("App is listening at 5000..!"));