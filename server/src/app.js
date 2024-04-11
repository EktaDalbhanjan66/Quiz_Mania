const express = require("express");

const cors = require("cors");

const app = express();
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderBoardRoutes = require("./routes/leaderBoardRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/leaderboard", leaderBoardRoutes);

module.exports = app;
