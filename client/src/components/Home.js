import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../App";
import { message } from "antd";
import Quiz from "./Quiz";
import "./Home.css";

const Home = () => {
  const [allQuiz, setAllQuiz] = useState([]);

  const getAllQuiz = async () => {
    try {
      const { data } = await axios.get(`${config.endpoint}/quiz/get-all-quiz`);
      if (data.success) {
        message.success(data.message);
        setAllQuiz(data.data);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllQuiz();
  }, []);

  return (
    <div className="home">
      {allQuiz.map((quiz) => (
        <Quiz
          key={quiz._id}
          quiz={quiz}
        />
      ))}
    </div>
  );
};

export default Home;
