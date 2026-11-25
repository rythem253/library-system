// ==========================================
// 1. Imports, middleware, and file paths
// ========================================== 

const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const { watch } = require("fs");

const app = express();
const PORT = 3001;



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// express.json() lets the server read JSON request bodies. 
// Without this middleware, req.body will usually be undefined. 
app.use(express.json());
// CORS allows the React app to talk to this server. 
// credentials: true is required because this lab uses sessions. 
// We allow both localhost and 127.0.0.1 because Vite may show either one. 
app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

async function findUser(username) {

}

app.post("/api/login", async (req, res) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        //check if user exist in DB
        

        //Compare password

        //if all good then send res.ok
        //temp
        res.json({ message: "Login successful.", username });

    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }


});
