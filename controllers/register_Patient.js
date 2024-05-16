import Patient from "../models/patient.js";
import Hospital from "../models/hospital.js";
import Psychiatrist from "../models/psychiatrist.js";


//****************** VALIDATION FUNCTIONS ************/

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

//*******************************  Task - 1 *********************************************************** */


// Patient registration route with custom validation

const register_Patient = async (req, res) => {

    // checking wheather the frontend pass the information or not in request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ errors: ["Request body is missing or empty"] });
  }


  // DESTRUCTING THE REQ.BODY

  const { name, address, email, phoneNumber, password, patientPhoto, hospitalName, psychiatristName } =
    req.body;


    //  VALIDATION CHECK  OF FRONTEND DATA

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

   
    // finding the hospital Id so that we will add it in the patient database 

    const  hospital= await Hospital.findOne({name:hospitalName})
    
    const psychiatrist= await Psychiatrist.findOne({name:psychiatristName})
    if(!psychiatrist || !hospital)
     {
        return res.status(400).json({ error: 'Psychiatrist and hospital is Not in the System please enter the valid Psychiatrist or hospital name  ' });

     }
      const hospitalId= hospital._id;
      const psychiatristId = psychiatrist._id;
      
   // comparing the psychiatrist id and hospital id that will insure that that the pyschiatrist is working for your hospital or not
   // because if the psychiatrist diffrent and your hospital is diffrent which could not be possible as your hospital should have your psychiatrist working with them

      if (psychiatrist.hospitalId.toString() !== hospitalId.toString()) {
        console.log('ok');
        
        return res.status(400).json({ error: 'Selected psychiatrist does not belong to the specified hospital' });
      }
//****************** CREATING NEW PATIENTS AFTER VALIDATING ************************************************ */
     
   // CREATING NEW PATIENT

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

    //*************************  CRUD OPERATION  ***************************************************/

  // updating the hospital database and adding patient in there database 
    const adding_patient= await  Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { patients: newPatient._id } },
      );
      console.log('hnji');
      
  // UPDATING THE PSYCHIATRIST DATABASE BY ADDING THE PATIENT IN IT 
    const addingPatient_intoPsychiatrist= await  Psychiatrist.findByIdAndUpdate(
        psychiatristId,
        { $push: { patients: newPatient._id } },
      );

  // SENDING RESPONSE TO THE FRONTEND  .............

    res.status(201).send(newPatient);

  }
   catch (error) {

     // SENDING ERROR TO THE FRONTEND IF ABOVE CASE WILL CREATE ANY ERROR
    res.status(400).send(error);
  }
};

export default register_Patient;