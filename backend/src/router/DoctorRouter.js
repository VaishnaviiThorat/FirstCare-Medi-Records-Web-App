import express from 'express';
import { doctorLogin, registerDoctor } from '../controller/DoctorController.js';

const doctorRouter = express.Router();

doctorRouter.post('/registration', registerDoctor);
doctorRouter.post('/login', doctorLogin);

export default doctorRouter;