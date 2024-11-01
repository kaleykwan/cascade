import React, { useState } from "react";
import "../styles/createProject.css";

export const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [clientID, setClientID] = useState("");
  const [companyID, setCompanyID] = useState("");

  async function addProject(e) {
    e.preventDefault();
    const project = {
      name: name,
      status: status,
      priority: priority,
      description: description,
      client_id: clientID,
      company_id: companyID,
    };
    try {
      let response;
      response = await fetch("http://localhost:5050/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setName("");
      setStatus("");
      setDescription("");
      setPriority("");
      setClientID("");
      setCompanyID("");
    }
  }

  return (
    <div>
      <h3>Create New Project</h3>
      <div className="create-project-form-fields">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="description"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="company ID"
          value={companyID}
          onChange={(e) => setCompanyID(e.target.value)}
        />
        <input
          type="text"
          placeholder="client ID"
          value={clientID}
          onChange={(e) => setClientID(e.target.value)}
        />
      </div>
      <button type="submit" onClick={addProject}>
        Add Project
      </button>
    </div>
  );
};
