const express = require("express");
const router = express.Router();

const Quiz = require("../models/quizModel");
const LeaderBoard = require("../models/leaderBoardModel");
const User = require("../models/userModel");

//add-quiz
router.post("/add-quiz", async (req, res) => {
  try {
    const newQuiz = await Quiz(req.body);
    await newQuiz.save();
    res.send({
      success: true,
      message: "Quiz added successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all-quiz", async (req, res) => {
  try {
    const allQuiz = await Quiz.find();
    res.send({
      success: true,
      message: "Quizzes fetched Successfully",
      data: allQuiz,
    });
  } catch (error) {
    console.log(error);
  }
});

//get-quiz-by-id
router.post("/get-quiz-by-id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.body.quizId);
    res.send({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.log(error);
  }
});

//get quiz by name
router.post("/get-quiz-by-name", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ name: req.body.name });
    if (!quiz) {
      res.send({
        success: false,
        message: "This quiz does not exist",
      });
    }

    res.send({
      success: "true",
      message: "success",
      data: quiz,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/submit-quiz", async (req, res) => {
  const { userId, name, email, marks, quizId } = req.body;

  try {
    let leaderBoard = await LeaderBoard.findOne({ quiz: quizId });

    if (!leaderBoard) {
      leaderBoard = new LeaderBoard({ quiz: quizId });
    }

    leaderBoard.leaderBoard.push({ email, name, marks });
    await leaderBoard.save();

    const user = await User.findById(userId);
    
    user.quizAttempted.push(quizId);
    await user.save();

    res.send({
      success: true,
      message: "Quiz Submitted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error submitting quiz",
    });
  }
});

router.put("/delete-quiz", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.body.quizId);
    res.send({
      success: true,
      message: "The quiz has been deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
