import React from "react";
import { Modal, message, Button } from "antd";

const MarksModal = ({
  isMarksModalOpen,
  setIsMarksModalOpen,
  marks,
  total,
  goToLeaderBoard
}) => {
  return (
    <>
      <Modal
        title="Score"
        open={isMarksModalOpen}
        footer={null}
        closable={false}
      >
        <p className="pt-3 fs-18">
          You Scored {marks} marks out of {total}
        </p>
        <Button type="primary" onClick={goToLeaderBoard}>
          Go to LeaderBoard
      </Button>
      </Modal>
    </>
  );
};

export default MarksModal;
