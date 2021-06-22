require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const DB = require('./src/scripts/DB');
const db = mysql.createPool(DB.getConnectionData()).promise();

const PORT = 80;
app.use(express.json());
app.listen(PORT, () => {
    console.log("Сервер запущен!");
})

app.put("/api/deviceInfo", async (req, res) => {
    const {userId, deviceInfo} = req.body;
    await db.query("INSERT INTO deviceInfo SET deviceId=?, info=?", [userId, deviceInfo])
        .catch(e => {
            res.status(500).end();
            return;
        });

    res.status(201).end();
})

app.put("/api/perfomance", async (req, res) => {
    const {deviceId, menuFPS, ingameFPS} = req.body;
    await db.query("INSERT INTO perfomance SET deviceId = ?, menuFPS = ?, ingameFPS = ?", [deviceId, menuFPS, ingameFPS])
        .catch(e => {
            res.status(500).end();
            return;
        });

    res.status(201).end();
})