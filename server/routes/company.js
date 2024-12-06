import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the companies.
router.get("/", async (req, res) => {
  let collection = db.collection("companies");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get company by id
router.get("/:id", async (req, res) => {
  let collection = db.collection("companies");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new project.
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    let collection = db.collection("companies");
    let result = await collection.insertOne({ name: name });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding company");
  }
});

export default router;
