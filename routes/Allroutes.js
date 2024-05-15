import express from 'express';
import register_Patient from '../controllers/register_Patient';

const router= express.Router();

router.post('/patients/register', register_Patient);

export default router;