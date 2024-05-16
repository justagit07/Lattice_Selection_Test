import mongoose from "mongoose";

const psychiatrist_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },

  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

const Psychiatrist = mongoose.model("Psychiatrist", psychiatrist_schema);
export default Psychiatrist;
