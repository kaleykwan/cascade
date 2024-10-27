import React, { useState } from "react";
import "../styles/project.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Project = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPriority, setNewPriority] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const updates = {
      name: newName,
      status: newStatus,
      priority: newPriority,
    };
    try {
      let response;
      // if we are updating a project we will PATCH to /project/:id.
      response = await fetch(
        `http://localhost:5050/project/${props.project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      handleClose();
    }
  }

  return (
    <div className="project-container">
      <div className="project-data">
        <p className="project-name">{props.project.name}</p>
        <div className="project-tags">
          <p className="project-tag" style={{ backgroundColor: "blue" }}>
            Priority: {props.project.priority}
          </p>
          <p
            className="project-tag"
            style={{
              backgroundColor:
                props.project.status === "complete"
                  ? "#339119"
                  : props.project.status === "in-progress"
                  ? "#ebb515"
                  : "#b51610",
            }}
          >
            Status: {props.project.status}
          </p>
        </div>
      </div>
      <p className="project-description">{props.project.description}</p>
      <button
        type="button"
        onClick={() => {
          props.deleteProject(props.project._id);
        }}
      >
        Delete
      </button>
      <button type="button" onClick={handleOpen}>
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <input
              type="text"
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Priority"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            />
          </div>
          <button type="submit" onClick={onSubmit}>
            Update Project
          </button>
        </Box>
      </Modal>
    </div>
  );
};
