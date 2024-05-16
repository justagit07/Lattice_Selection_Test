import mongoose from "mongoose";

const patient_Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
    minlength: 10,
  },

  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
  },

  patientPhoto: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  psychiatristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Psychiatrist',
    required: true
  }
});

const Patient = mongoose.model("Patient", patient_Schema);
export default Patient;
