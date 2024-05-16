import Patient from "../models/patient.js";
import Hospital from "../models/hospital.js";
import Psychiatrist from "../models/psychiatrist.js";


const validateName = (name) => {
  if (!name) {
    return "Name is required";
  }
  return null;
};

const validateAddress = (address) => {
  if (!address || address.length < 10) {
    return "Address should be at least 10 characters long";
  }
  return null;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Email is not valid";
  }
  return null;
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+\d{1,3}\d{10}$/;
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return "Phone number should be at least 10 digits with country code";
  }
  return null;
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (
    !password ||
    password.length < 8 ||
    password.length > 15 ||
    !passwordRegex.test(password)
  ) {
    return "Password must be at least 8 characters long, at most 15 characters long, and contain one uppercase letter, one lowercase letter, and one number";
  }
  return null;
};

const validatePatientPhoto = (patientPhoto) => {
  if (!patientPhoto) {
    return "Patient photo is required";
  }
  return null;
};

// Patient registration route with custom validation

const register_Patient = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ errors: ["Request body is missing or empty"] });
  }

  const { name, address, email, phoneNumber, password, patientPhoto, hospitalName, psychiatristName } =
    req.body;

  const errors = [
    validateName(name),
    validateAddress(address),
    validateEmail(email),
    validatePhoneNumber(phoneNumber),
    validatePassword(password),
    validatePatientPhoto(patientPhoto),
  ].filter((error) => error !== null);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {

    const  hospital= await Hospital.findOne({name:hospitalName})
    const psychiatrist= await Psychiatrist.findOne({name:psychiatristName})
      const hospitalId= hospital._id;
      const psychiatristId = psychiatrist._id;

      console.log('this is hospitalId', hospitalId);
      console.log('this is hospitalId', psychiatrist.hospitalId);
      

      if (psychiatrist.hospitalId.toString() !== hospitalId.toString()) {
        console.log('ok');
        
        return res.status(400).json({ error: 'Selected psychiatrist does not belong to the specified hospital' });
      }

    const newPatient = new Patient({
      name,
      address,
      email,
      phoneNumber,
      password,
      patientPhoto,
      hospitalId,
      psychiatristId
    });
    await newPatient.save();

    // adding the patient to the hospital schema also for futhur use 


    const adding_patient= await  Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { patients: newPatient._id } },
      );
    const addingPatient_intoPsychiatrist= await  Psychiatrist.findByIdAndUpdate(
        psychiatristId,
        { $push: { patients: newPatient._id } },
      );

      console.log('this is the added patient', adding_patient);
      console.log('this is the added patient', addingPatient_intoPsychiatrist);

      


    res.status(201).send(newPatient);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default register_Patient;