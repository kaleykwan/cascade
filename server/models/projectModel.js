import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: String,
  client_id: String,
  company_id: String,
});

projectSchema.index({ company_id: 1 });
projectSchema.index({ client_id: 1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;
