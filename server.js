require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const db = mysql.createPool(getConnectionData()).promise();

const PORT = 80;
const HOST = "192.168.0.99";
app.use(express.json());
app.listen(PORT, HOST, () => {
    console.log("Сервер запущен!");
})

app.route("/api/deviceInfo")
    .put((req, res) => {
        const {userId, deviceInfo} = req.body;
        db.query("insert into deviceInfo set userId=?, info=?", [userId, deviceInfo])
            .catch(e => {
                res.status(500).end();
                return;
            })

        res.status(201).end();
    })

function getConnectionData() {
    const {host, user, password, database} = process.env;
    return {host, user, password, database};
}