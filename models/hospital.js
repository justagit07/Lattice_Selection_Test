import mongoose from "mongoose";

const hospital_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  psychiatrists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Psychiatrist",
    },
  ],
});

const Hospital = mongoose.model("Hospital", hospital_schema);

export default Hospital;
