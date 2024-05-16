import express from 'express';
import register_Patient from '../controllers/register_Patient.js';
import get_Psychiatrists from '../controllers/physchiatrist_detail.js';
import register_psychiatrist from '../controllers/registerPsychiatrist.js';
import register_Hospital from '../controllers/register_hospital.js';

const router= express.Router();
// these are the 2 assignment question routes 

router.post('/patients/register', register_Patient);

router.post('/psychiatrist/register', register_psychiatrist);

router.post('/hospital/register', register_Hospital);

router.get('/hospital/details', get_Psychiatrists )

export default router;