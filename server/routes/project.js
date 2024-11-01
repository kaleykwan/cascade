import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import Project from "../models/projectModel.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let results = await Project.find();
  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);
});

// This section will help you get projects by company id
router.get("/bycompany/:id", async (req, res) => {
  let result = await Project.find({ company_id: req.params.id });
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you get projects by client id
router.get("/byclient/:id", async (req, res) => {
  let result = await Project.find({ client_id: req.params.id });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new project.
router.post("/", async (req, res) => {
  const { name, description, priority, status, client_id, company_id } =
    req.body;
  try {
    const project = await Project.create({
      name,
      description,
      priority,
      status,
      client_id,
      company_id,
    });
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding project");
  }
});

// This section will help you update a project by id.
router.patch("/:id", async (req, res) => {
  try {
    let projectToUpdate = await Project.findById(req.params.id);
    projectToUpdate.name = req.body.name;
    projectToUpdate.status = req.body.status;
    projectToUpdate.priority = req.body.priority;
    await projectToUpdate.save();
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating project");
  }
});

// This section will help you delete a project
router.delete("/:id", async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting project");
  }
});

export default router;
