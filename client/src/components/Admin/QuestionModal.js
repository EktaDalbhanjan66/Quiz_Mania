import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const QuestionModal = ({
  questionModal,
  setQuestionModal,
  questions,
  setQuestions,
  formType,
}) => {
  const handleCancel = () => {
    setQuestionModal(false);
  };
  const onFinish = async ({
    description,
    option1,
    option2,
    option3,
    option4,
    answer,
  }) => {
    setQuestions([
      ...questions,
      {
        description,
        options: [option1, option2, option3, option4],
        answer,
      },
    ]);
    setQuestionModal(false);
  };
  return (
    <Modal
      centered
      title={formType === "add" ? "Add Question" : "Edit Question"}
      open={questionModal}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        // initialValues={selectedMovie}
        onFinish={onFinish}
      >
        <Col span={24}>
          <Form.Item
            label="Question Description"
            htmlFor="description"
            name="description"
            className="d-block"
            rules={[
              { required: true, message: "Question description is required!" },
            ]}
          >
            <TextArea
              id="description"
              rows="4"
              placeholder="Enter the question description"
            ></TextArea>
          </Form.Item>
        </Col>
        <Col span={24}>
          {[1, 2, 3, 4].map((index) => (
            <Form.Item
              key={`option${index}`}
              label={`Option ${index}`}
              name={`option${index}`}
              className="d-block"
              rules={[
                { required: true, message: `Option ${index} is required!` },
              ]}
            >
              <Input placeholder={`Enter option ${index}`} />
            </Form.Item>
          ))}
        </Col>
        <Col span={24}>
          <Form.Item
            label="Answer"
            htmlFor="answer"
            name="answer"
            className="d-block"
            rules={[{ required: true, message: "Answer is required!" }]}
          >
            <Input
              id="answer"
              type="text"
              placeholder="Enter the answer"
            ></Input>
          </Form.Item>
        </Col>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Add Question
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
