import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
