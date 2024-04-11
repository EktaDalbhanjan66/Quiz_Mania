import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Radio, List, Button, Table } from "antd";
import axios from "axios";
import { config } from "../App";

const LeaderBoard = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [leaderBoard, setLeaderBoard] = useState();
  const [quiz, setQuiz] = useState();

  const getLeaderBoard = async () => {
    try {
      const { data } = await axios.post(
        `${config.endpoint}/leaderBoard/get-leaderboard-by-id`,
        {
          quizId,
        }
      );
      if (data.success) {
        setLeaderBoard(data.data.leaderBoard);
        setQuiz(data.data.quiz);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!quizId) {
      message.warning("Please Select a Quiz");
      navigate("/");
    }
    getLeaderBoard();
  }, []);

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Score",
      dataIndex: "marks",
    },
  ];

  return (
    <div>
      <h1>{quiz?.name}</h1>
      <Table dataSource={leaderBoard} columns={tableHeadings} />
    </div>
  );
};

export default LeaderBoard;
