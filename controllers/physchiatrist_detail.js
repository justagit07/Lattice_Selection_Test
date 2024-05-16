import Hospital from "../models/hospital.js";
import Psychiatrist from "../models/psychiatrist.js";
//**************************** TASK - 2 ***************************************************** */

const get_Psychiatrists = async (req, res) => {

  const { hospitalId } = req.body;

  if (!hospitalId) {
    return res.status(400).json({ error: "Hospital ID is required" });
  }

  try {
    // Fetch hospital details 
    const hospital = await Hospital.findById(hospitalId)
      .populate("psychiatrists")
      .populate("patients");

   // checking wheather the hospital is valid or not 
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    // FINDING THE TOTAL PSYCHIATRISTS AND  PATIENTS IN THE HOSPITAL 
    const totalPsychiatrists = hospital.psychiatrists.length;
    const totalPatients = hospital.patients.length;


    //CREATING ARRAY OF PSYCHIATRIST ID WHICH WORK IN THE REQUESTED HOSPITAL

    const psychiatristIds = hospital.psychiatrists.map((p) => p._id);

    // FOR THE COUNT THE TOTAL PAIIENT USING THE AGGREGATE PIPLELINE SO THAT IT WILL WORK ON ALL THE ID'S 

    const psychiatristDetails = await Psychiatrist.aggregate([
      {
        $match: { _id: { $in: psychiatristIds } }, // Match only the Psychiatrists with IDs present in psychiatristIds array
      },
      {
        $project: {
          _id: 1,
          name: 1,
          patientCount: { $size: "$patients" }, // Count the number of patients for each Psychiatrist
        },
      },
    ]);

   // CREATING THE RESPONSE OBJECT 
    const response = {
      hospitalName: hospital.name,
      totalPsychiatristsCount: totalPsychiatrists,
      totalPatientsCount: totalPatients,
      psychiatristDetails,
    };

   // SENDING THE RESPONSE TO THE FRONTEND

    res.status(200).json(response);
  } catch (error) {
  
    // SENDING ERROR TO THE FRONTEND IF ABOVE CASE WILL CREATE ANY ERROR
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

export default get_Psychiatrists;
