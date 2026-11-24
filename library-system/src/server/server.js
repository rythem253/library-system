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
