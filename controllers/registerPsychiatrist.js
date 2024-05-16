import Hospital from "../models/hospital.js";
import Psychiatrist from "../models/psychiatrist.js";

const register_psychiatrist= async (req,res)=>
    {
        
        try
        {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res
                  .status(400)
                  .json({ errors: ["Request body is missing or empty"] });
              }
              
            const {name ,hospitalName }= req.body

            const hospitaldetails=  await Hospital.findOne({name:hospitalName})
            const hospitalId= hospitaldetails._id;

            if(!hospitaldetails)
            {
                return res .status(500) .json({ errors: ["Cannot able to find the Hospital"] });

            }


               const newPsychiatrist = new Psychiatrist({ name, hospitalId });
               await newPsychiatrist.save();
                 await Hospital.findByIdAndUpdate(hospitalId, {$push:{psychiatrists: newPsychiatrist._id}})

               res.status(200).json(newPsychiatrist)
        }
        catch (error) {
            res.status(400).send(error);
          }
    }


    export default register_psychiatrist;