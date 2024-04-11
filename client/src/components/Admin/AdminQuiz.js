import React from "react";

const AdminQuiz = ({
  quiz,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedQuiz,
  setSelectedQuiz,
}) => {
  return (
    <>
      <div>{quiz.name}</div>
      <button>Edit</button>
      <button
        onClick={() => {
          setSelectedQuiz(quiz);
          setIsDeleteModalOpen(true);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default AdminQuiz;
