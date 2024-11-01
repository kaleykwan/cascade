import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ProjectList } from "./components/projectList";
import { CreateProject } from "./components/createProject";
import { Report } from "./components/report";

function App() {

  return (
    <div>
      <div className="main-container">
        <ProjectList />
        <CreateProject />
      </div>
      <Report />
    </div>
  );
}

export default App;
