require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const DB = require('./src/scripts/DB');
const db = mysql.createPool(DB.getConnectionData()).promise();
const moment = require("moment");

const PORT = 80;
app.use(express.json());
app.listen(PORT, () => {
    console.log("Сервер запущен!");
})

app.put("/api/deviceInfo", async (req, res) => {
    const {deviceId, deviceInfo} = req.body;
    await db.query("INSERT INTO deviceInfo SET deviceId=?, info=?", [deviceId, deviceInfo])
        .catch(e => {
            res.status(500).end();
            return;
        });

    res.status(201).end();
})

app.put("/api/perfomance", async (req, res) => {
    const {deviceId, version,  levelName, fps, meanFps} = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await db.query("INSERT INTO perfomance SET deviceId = ?, date = ?, version = ?, levelName = ?, fps = ?, meanFps = ?", [deviceId, date, version, levelName, parseInt(fps), parseInt(meanFps)])
        .catch(e => {
            res.status(500).end();
            return;
        });

    res.status(201).end();
})