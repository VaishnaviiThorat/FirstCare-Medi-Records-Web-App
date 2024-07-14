import express from 'express';
import { deletePatientTreatmentsDataById, fetchPatientDetails, fetchPatientTreatmentsData, fetchPatientTreatmentsDataById, getTreatmentRecordByTreatmentId, removerTreatmentRecord, saveTreatment, updateTreatmentRecord } from '../controller/patientTreatmentController.js';
import { verifyTokenDoctor } from '../middleware/verifyTokenDoctor.js';
import { verifyTokenPatient } from '../middleware/verifyTokenPatient.js';

const patientTreatmentRouter = express.Router();

patientTreatmentRouter.get('/allrecord', fetchPatientTreatmentsData);
patientTreatmentRouter.get('/patientDetails/:PatientUserId', fetchPatientDetails);
patientTreatmentRouter.post('/addrecord', saveTreatment);
patientTreatmentRouter.get('/doctorDashboard/:PatientUserId', fetchPatientTreatmentsDataById);
patientTreatmentRouter.get('/patientDashboard/:PatientUserId', fetchPatientTreatmentsDataById);
patientTreatmentRouter.delete('/:TreatmentID', removerTreatmentRecord);
patientTreatmentRouter.get('/:TreatmentID', getTreatmentRecordByTreatmentId);
patientTreatmentRouter.put('/:TreatmentID', updateTreatmentRecord);
//patientTreatmentRouter.get('/del/:TreatmentID', verifyTokenDoctor, deletePatientTreatmentsDataById);

export default patientTreatmentRouter;