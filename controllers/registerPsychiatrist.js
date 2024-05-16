import Hospital from "../models/hospital.js";
import Psychiatrist from "../models/psychiatrist.js";

const register_psychiatrist = async (req, res) => {

  try {

    // CHECKING WHEATHER IS REQ.BODY  EMPTY 
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ errors: ["Request body is missing or empty"] });
    }

    // DESTRUCING OF FRONTEND DATA

    const { name, hospitalName } = req.body;

    // FIND THE HOSPITAL ID SO THAT WE WILL ADD TO THE PSYCHIATRIST DATABASE

    const hospitaldetails = await Hospital.findOne({ name: hospitalName });
    const hospitalId = hospitaldetails._id;
    
    // CHECKING THE HOSPITAL IS VALLID OR NOT 
    if (!hospitaldetails) {
      return res
        .status(500)
        .json({ errors: ["Cannot able to find the Hospital"] });
    }
  

    // CREATING  NEW PSYCHIATRIST WITH NAME AND THE WORKING HOSPITAL
    const newPsychiatrist = new Psychiatrist({ name, hospitalId });
    await newPsychiatrist.save();

    // FINDING AND UPDATING THE HOSPITAL DATABASE ALSO A NEW ENTRY OF THE PSYCHIATRIST IN HOSPITAL DATABASE 
    await Hospital.findByIdAndUpdate(hospitalId, {
      $push: { psychiatrists: newPsychiatrist._id },
    });


    // SENDING SUCESS STATUS AND THE RESPONSE TO THE FRONTEND 
    res.status(200).json(newPsychiatrist);
  } catch (error) {

    // IF ERROR ENCOUNTER SENDING THE ERROR RESPONSE
    res.status(400).send(error);
  }
};

export default register_psychiatrist;
