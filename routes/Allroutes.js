import express from 'express';
import register_Patient from '../controllers/register_Patient';
import get_Psychiatrists from '../controllers/physchiatrist_detail';

const router= express.Router();
// these are the 2 assignment question routes 

router.post('/patients/register', register_Patient);
router.get('/psychiatrists', get_Psychiatrists )

export default router;