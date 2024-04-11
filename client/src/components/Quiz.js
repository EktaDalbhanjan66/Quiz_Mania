import React from "react";
import "./Quiz.css";
import { Link, useNavigate } from "react-router-dom";

const Quiz = ({ quiz }) => {
  const navigate = useNavigate();
  return (
    <div className="quiz">
      {quiz.name}
      <button
        onClick={() => {
          navigate(`/attempt-quiz/${quiz._id}`);
        }}
      >
        Attempt Quiz
      </button>
      <button
        onClick={() => {
          navigate(`/leaderboard/${quiz._id}`);
        }}
      >
        View leaderboard
      </button>
      
    </div>
  );
};

export default Quiz;
