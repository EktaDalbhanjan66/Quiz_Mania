import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../../App";
import { useState } from "react";
import QuestionModal from "./QuestionModal";

const QuizForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedQuiz,
  setSelectedQuiz,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`${config.endpoint}/quiz/add-quiz`, {
        name: values.title,
        questions,
      });
      if (data.success) {
        message.success(data.message);
        setQuestions([]);
        getData();
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error(error);
    }
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((question, ind) => ind != index));
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Quiz" : "Edit Quiz"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedQuiz}
        onFinish={onFinish}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Quiz Name"
              htmlFor="title"
              name="title"
              className="d-block"
              rules={[{ required: true, message: "Quiz name is required!" }]}
            >
              <Input
                id="title"
                type="text"
                placeholder="Enter the Quiz name"
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            style={{ fontSize: "1rem", fontWeight: "600" }}
            onClick={() => setQuestionModal(true)}
          >
            Add Question
          </Button>
        </Form.Item>
        {questionModal && (
          <QuestionModal
            questionModal={questionModal}
            setQuestionModal={setQuestionModal}
            questions={questions}
            setQuestions={setQuestions}
            formType={formType}
          />
        )}
        {questions.map((question, ind) => (
          <div>
            <p key={question.description}>{question.description}</p>
            <button onClick={() => handleDeleteQuestion(ind)}>Delete</button>
          </div>
        ))}
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Quiz
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuizForm;
