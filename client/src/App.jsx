import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ProjectList } from "./components/projectList";
import { CreateProject } from "./components/createProject";

function App() {

  return (
    <div className="main-container">
      <ProjectList />
      <CreateProject />
    </div>
  );
}

export default App;
