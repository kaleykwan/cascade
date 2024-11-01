import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import Client from "../models/clientModel.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the companies.
router.get("/", async (req, res) => {
  let results = await Client.find();
  res.send(results).status(200);
});

// This section will help you get company by id
router.get("/:id", async (req, res) => {
  let result = await Client.findById(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new project.
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const project = await Client.create({ name });
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding client");
  }
});

// This section will help you update a project by id.
router.patch("/:id", async (req, res) => {
  try {
    let clientToUpdate = await Client.findById(req.params.id);
    clientToUpdate.name = req.body.name;
    await clientToUpdate.save();
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating client");
  }
});

// This section will help you delete a project
router.delete("/:id", async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id });
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting client");
  }
});

export default router;
