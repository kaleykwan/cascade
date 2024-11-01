import express from "express";
import cors from "cors";
import projects from "./routes/project.js";
import companies from "./routes/company.js";
import clients from "./routes/client.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5050;
const app = express();
const uri = process.env.ATLAS_URI || "";

app.use(cors());
app.use(express.json());
app.use("/project", projects);
app.use("/company", companies);
app.use("/client", clients);

mongoose.connect(uri)
.then(() => {
    // listen for requests
    app.listen(PORT, () => {
    console.log(`Connected successfully to the database and listening on port ${PORT}`)});
})
.catch((error) => {
    console.log(error);
})

// start the Express server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
