const express = require("express");
const router = express.Router();

const LeaderBoard = require("../models/leaderBoardModel");

router.post("/get-leaderboard-by-id", async (req, res) => {
  try {
    const leaderBoard = await LeaderBoard.findOne({
      quiz: req.body.quizId,
    }).populate("quiz");
    
    res.send({
      success: true,
      data: leaderBoard,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
