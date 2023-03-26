require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(cookieParser());


mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PWD + "@cluster0.8jvshni.mongodb.net/tac_tac");

// exports
const auth = require("./exports/auth.js");
const schemas = require("./exports/schemas.js");
const functions = require("./exports/functions.js");

const Command = mongoose.model("Command", schemas.cmdSchema);



app.get("/", async (req, res)=>{
    const cmds = await Command.aggregate([
        {
          $group: {
            _id: '$phone_number',
            commands: { $push: '$$ROOT' } // group by number and put all commands in array
          }
        }
    ]).exec();
    res.render("index", {cmds: functions.change_cmd(cmds)})
})


app.post("/", async (req, res)=>{
    const cmds = await Command.aggregate([
        {
          $group: {
            _id: '$phone_number',
            commands: { $push: '$$ROOT' } // group by number and put all commands in array
          }
        }
    ]).exec();
    res.render("index", {cmds: functions.change_cmd(cmds)})
})


app.listen(process.env.PORT || 3000, () => {
    console.log("[+] Server is running...");
});