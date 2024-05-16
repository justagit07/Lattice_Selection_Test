import Hospital from "../models/hospital.js";

const register_Hospital= async(req,res)=>
{
    const {name, address}= req.body;
    if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ errors: ["Request body is missing or empty"] });
      }
    try
    {
        const hospital= new Hospital({name, address})
        await hospital.save();

        res.status(200).json(hospital);
    
    }
    catch (error) {
        res.status(400).send(error);
      }
}

export default register_Hospital;