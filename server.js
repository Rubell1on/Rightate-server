require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const DB = require('./src/scripts/DB');
const db = mysql.createPool(DB.getConnectionData()).promise();
const moment = require("moment");

async function logError(db, message) {
    await db.query("INSERT INTO errors SET message=?", [message])
        .catch(async e => {
            await logError(db, JSON.stringify(e));
        })
}

const PORT = 80;
app.use(express.json());
app.listen(PORT, () => {
    console.log("Сервер запущен!");
})

app.put("/api/deviceInfo", async (req, res) => {
    const {deviceId, deviceInfo} = req.body;
    await db.query("INSERT INTO deviceInfo SET deviceId=?, info=?", [deviceId, deviceInfo])
        .catch(async e => {
            await logError(JSON.stringify(e));
            res.status(500).end();
            return;
        });

    res.status(201).end();
})

app.put("/api/perfomance", async (req, res) => {
    const {deviceId, version,  levelName, fps, meanFps} = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    await db.query("INSERT INTO perfomance SET deviceId = ?, date = ?, version = ?, levelName = ?, fps = ?, meanFps = ?", [deviceId, date, version, levelName, parseInt(fps), parseInt(meanFps)])
        .catch(async e => {
            await logError(JSON.stringify(e));
            res.status(500).end();
            return;
        });

    res.status(201).end();
})

app.get("/", (req, res) => {
	res.status(200).end();
})

app.get("/testError", async (req, res) => {
    await logError(db, JSON.stringify({message: "hello world"}));
    res.status(200).end();
})