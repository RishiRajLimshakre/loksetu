const express = require ("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
 res.json({message: "LokSetu API is running"});
})

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

module.exports = app; 
