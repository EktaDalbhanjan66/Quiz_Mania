const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'quiz',
      required: true,
    },
    leaderBoard: {
      type: [
        {
          email: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          marks: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const LeaderBoard = mongoose.model("leaderboard", leaderBoardSchema);

module.exports = LeaderBoard;
