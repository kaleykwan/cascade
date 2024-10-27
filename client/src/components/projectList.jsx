import React, { useState, useEffect } from "react";
import { Project } from "./project";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(`http://localhost:5050/project/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const res = await response.json();
      setProjects(res);
    }
    getProjects();
    return;
  }, [projects.length]);

  // This method will delete a record
  async function deleteProject(id) {
    await fetch(`http://localhost:5050/project/${id}`, {
      method: "DELETE",
    });
    const newProjects = projects.filter((el) => el._id !== id);
    setProjects(newProjects);
  }

  // This method will map out the records on the table
  function projectList() {
    return projects.map((project) => {
      return (
        <Project
          project={project}
          deleteProject={() => deleteProject(project._id)}
          key={project._id}
        />
      );
    });
  }

  return (
    <div>
      <div>
        <h3>Project List</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {projectList()}
        </div>
      </div>
    </div>
  );
};
