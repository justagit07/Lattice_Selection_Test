import Hospital from "../models/hospital";
import Psychiatrist from "../models/psychiatrist";

const get_Psychiatrists = async(req, res)=>
{
    const { hospitalId } = req.body;

    if (!hospitalId) {
      return res.status(400).json({ error: "Hospital ID is required" });
    }

    
    try {
        // Fetch hospital details
        const hospital = await Hospital.findById(hospitalId)
          .populate('psychiatrists')
          .populate('patients');
    
        if (!hospital) {
          return res.status(404).json({ error: 'Hospital not found' });
        }
    
        const totalPsychiatrists = hospital.psychiatrists.length;
        const totalPatients = hospital.patients.length;


        const psychiatristIds = hospital.psychiatrists.map(p => p._id);

          const psychiatristDetails = await Psychiatrist.aggregate([
            { $match: { _id: { $in: psychiatristIds } } },
      {
        $lookup: {
          from: 'patients',
          localField: '_id',
          foreignField: 'psychiatristId',
          as: 'patients'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          patientCount: { $size: '$patients' }
        }
      }
    ]);

    
        const response = {
          hospitalName: hospital.name,
          totalPsychiatristsCount: totalPsychiatrists,
          totalPatientsCount: totalPatients,
          psychiatristDetails
        };
    
        res.status(200).json(response);
      } 


      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
      }

}


export default get_Psychiatrists;