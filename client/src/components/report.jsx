import React, { useState, useEffect, useMemo } from "react";
import { Project } from "./project";
import "../styles/report.css";

export const Report = () => {
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const response = await fetch(`http://localhost:5050/company/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const res = await response.json();
      setCompanies(res);
    }

    async function getClients() {
      const response = await fetch(`http://localhost:5050/client/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const res = await response.json();
      setClients(res);
    }
    getCompanies();
    getClients();
    return;
  }, [companies.length, clients.length]);

  const avgPriority = useMemo(() => {
    let totalPriority = 0;
    projects.forEach((project) => {
      totalPriority += parseInt(project.priority);
    });
    return totalPriority / parseFloat(projects.length);
  }, [projects]);

  const numInProgress = useMemo(() => {
    let total = 0;
    projects.forEach((project) => {
      if (project.status === "in-progress") {
        total += 1;
      }
    });
    return (total / parseFloat(projects.length)) * 100;
  }, [projects]);

  const numCompleted = useMemo(() => {
    let total = 0;
    projects.forEach((project) => {
      if (project.status === "completed") {
        total += 1;
      }
    });
    return (total / parseFloat(projects.length)) * 100;
  }, [projects]);

  const numNotStarted = useMemo(() => {
    let total = 0;
    projects.forEach((project) => {
      if (project.status === "not started") {
        total += 1;
      }
    });
    return (total / parseFloat(projects.length)) * 100;
  }, [projects]);

  // This method fetches the projects by company
  async function getProjectsByCompany(id) {
    console.log("getting projects by company");
    const response = await fetch(
      `http://localhost:5050/project/bycompany/${id}`
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const res = await response.json();
    setProjects(res);
  }

  // This method fetches the projects by client
  async function getProjectsByClient(id) {
    const response = await fetch(
      `http://localhost:5050/project/byclient/${id}`
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const res = await response.json();
    setProjects(res);
  }

  // This method will delete a record
  async function deleteProject(id) {
    await fetch(`http://localhost:5050/project/${id}`, {
      method: "DELETE",
    });
    const newProjects = projects.filter((el) => el._id !== id);
    setProjects(newProjects);
  }

  function createReport(id, byCompany) {
    console.log("inside create report");
    if (byCompany) {
      getProjectsByCompany(id);
      console.log("got projects: " + projects);
    } else {
      getProjectsByClient(id);
    }
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

  // This method will map out the records on the table
  function companyList() {
    return companies.map((company) => {
      return (
        <div
          style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}
          key={company._id}
        >
          <p>
            {company.name} : {company._id}
          </p>
          <button
            onClick={() => {
              createReport(company._id, true);
            }}
          >
            Select
          </button>
        </div>
      );
    });
  }

  function clientList() {
    return clients.map((client) => {
      return (
        <div
          style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}
          key={client._id}
        >
          <p>
            {client.name} : {client._id}
          </p>
          <button
            onClick={() => {
              createReport(client._id, false);
            }}
          >
            Select
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="company-client-wrapper">
        <div>
          <h3>Companies</h3>
          <div>{companyList()}</div>
        </div>
        <div>
          <h3>Clients</h3>
          <div>{clientList()}</div>
        </div>
      </div>
      <div>
        <h3>Report</h3>
        {projects.length > 0 && (
          <div>
            <p>Average Priority: {avgPriority}</p>
            <p>Not Started: {numNotStarted}%</p>
            <p>In Progress: {numInProgress}%</p>
            <p>Completed: {numCompleted}%</p>
          </div>
        )}
        {projects.length == 0 && <p>No projects</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, justifySelf: "center" }}>
          {projectList()}
        </div>
      </div>
    </div>
  );
};
