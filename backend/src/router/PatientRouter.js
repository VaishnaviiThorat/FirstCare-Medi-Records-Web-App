import express from 'express';
import { patientLogin, registerPatient } from '../controller/PatientController.js';

const patientRouter = express.Router();

patientRouter.post('/registration', registerPatient);
patientRouter.post('/login', patientLogin);

export default patientRouter;