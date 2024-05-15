import mongoose from "mongoose";

const psychiatrist_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
});

const Psychiatrist = mongoose.model("Psychiatrist", psychiatrist_schema);
export default Psychiatrist;
