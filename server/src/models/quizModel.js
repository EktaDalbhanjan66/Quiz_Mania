const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: [
        {
          description: {
            type: String,
            required: true,
          },
          options: {
            type: Array,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      required: true, 
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
