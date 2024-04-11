import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Radio, List, Button } from "antd";
import axios from "axios";
import { config } from "../App";
import { hideLoading, showLoading } from "../features/Loader/loaderSlice";
import MarksModal from "./MarksModal";

const AttemptQuiz = () => {
  const { user } = useSelector((state) => state.user);
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [marks, setMarks] = useState(0);

  const handleSelection = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };
  //getQuiz
  const getQuiz = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        `${config.endpoint}/quiz/get-quiz-by-id`,
        {
          quizId,
        }
      );
      if (data.success) {
        dispatch(hideLoading());
        message.success("Quiz Fetched Successfully");
        setQuiz(data.data);
      } else {
        dispatch(hideLoading());
        message.error("Quiz Not Fetched");
      }
    } catch (error) {
      message.error(error);
    }
  };
  //Submit the Quiz
  const handleSubmitQuiz = async () => {
    try {
      dispatch(showLoading());
      const score = quiz.questions.reduce((accumulator, currentValue, ind) => {
        return (
          accumulator +
          (currentValue.answer === (selectedAnswers[ind] || null) ? 1 : 0)
        );
      }, 0);

      setMarks(score);

      const { data } = await axios.post(`${config.endpoint}/quiz/submit-quiz`, {
        name: user.name,
        userId: user._id,
        email: user.email,
        marks: score,
        quizId,
      });

      if (data.success) {
        dispatch(hideLoading());
        message.success(data.message);
        setIsMarksModalOpen(true);
      } else {
        dispatch(hideLoading());
        message.error(data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  // go to leaderbooard
  const goToLeaderBoard = async () => {
    navigate(`/leaderboard/${quizId}`);
  };

  const checkAttempted = async () => {
    try {
      const { data } = await axios.post(
        `${config.endpoint}/users/is-attempted`,
        {
          userId: user._id,
          quizId,
        }
      );
      if (data.isAttempted) {
        message.warning("Quiz Already Attempted");
        navigate("/");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!quizId) {
      message.warning("Please select a quiz");
      navigate("/");
    }
    checkAttempted();
    getQuiz();
  }, []);

  return (
    <div>
      <List
        dataSource={quiz.questions}
        renderItem={(question, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={question.description} />
            <Radio.Group
              value={selectedAnswers[index] || null}
              onChange={(e) => handleSelection(index, e.target.value)}
            >
              {question.options.map((option) => (
                <Radio value={option} key={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleSubmitQuiz}>
        Submit
      </Button>
      {isMarksModalOpen && (
        <MarksModal
          isMarksModalOpen={isMarksModalOpen}
          setIsMarksModalOpen={setIsMarksModalOpen}
          marks={marks}
          total={quiz.questions.length}
          goToLeaderBoard={goToLeaderBoard}
        />
      )}
    </div>
  );
};

export default AttemptQuiz;
