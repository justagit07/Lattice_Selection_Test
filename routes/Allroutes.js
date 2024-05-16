import express from 'express';
import register_Patient from '../controllers/register_Patient.js';
import get_Psychiatrists from '../controllers/physchiatrist_detail.js';
import register_psychiatrist from '../controllers/registerPsychiatrist.js';
import register_Hospital from '../controllers/register_hospital.js';

const router= express.Router();
// these are the 2 assignment question routes 



// ************************ task 1 ******************************************************
// the route for the first task is http://localhost:3000/api/patients/register  
router.post('/patients/register', register_Patient);


// ************************ task 2 ******************************************************
// the route for the second task is http://localhost:3000/api/hospital/details
router.get('/hospital/details', get_Psychiatrists )



// this route is  used for register the hospital http://localhost:3000/api/hospital/register
router.post('/hospital/register', register_Hospital);

// this route is used for register the Psychiatrist http://localhost:3000/api/psychiatrist/register.
router.post('/psychiatrist/register', register_psychiatrist);



export default router;