import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../../App";
import { showLoading, hideLoading } from "../../features/Loader/loaderSlice";

const DeleteQuizModal = ({
  isDeleteModalOpen,
  selectedQuiz,
  setIsDeleteModalOpen,
  setSelectedQuiz,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const quizId = selectedQuiz._id;
      const response = await axios.put(`${config.endpoint}/quiz/delete-quiz`, {
        quizId,
      });

      if (response.data.success) {
        console.log("id and respone ->  ", quizId, response.data);
        message.success(response.data.message);
        getData();
      } else {
        message.error(response.data.message);
        setSelectedMovie(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedQuiz(null);
  };
  return (
    <>
      <Modal
        title="Delete Quiz?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">Are you sure you want to delete this quiz?</p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this quiz data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteQuizModal;
