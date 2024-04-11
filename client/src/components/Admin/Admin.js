import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../App";
import { message } from "antd";
import { Button, Table } from "antd";
import AdminQuiz from "./AdminQuiz";
import QuizForm from "./QuizForm";
import DeleteQuizModal from "./DeleteQuizModal"

const Admin = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [formType, setFormType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    <div>
      Admin
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Quiz
        </Button>
      </div>
      {allQuiz.map((quiz) => (
        <AdminQuiz
          key={quiz._id}
          quiz={quiz}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
        />
      ))}
      {isModalOpen && (
        <QuizForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedQuiz={selectedQuiz}
          formType={formType}
          setSelectedQuiz={setSelectedQuiz}
          getData={getAllQuiz}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteQuizModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedQuiz={selectedQuiz}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedQuiz={setSelectedQuiz}
          getData={getAllQuiz}
        />
      )}
    </div>
  );
};

export default Admin;
