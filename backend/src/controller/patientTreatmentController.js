import { request, response } from "express";
import { PATIENTS_TABLE_NAME, TREATMENTS_TABLE_NAME } from "../constants/DbConstants.js";
import { connection } from "../utility/DbUtil.js";


//Fetch Treatment details
export const fetchPatientTreatmentsData = (request, response)=>{
    const qry=`select * from ${TREATMENTS_TABLE_NAME}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log("Error in fetching medical record: ", error);
            response.status(500).send({message: 'Something went wrong'});
        }
        else{
            if(result.length === 0){
                response.status(200).send({message: `0 Records in ${TREATMENTS_TABLE_NAME}`});
            }
            else{
                console.log(`fetched ${result.length} records from ${TREATMENTS_TABLE_NAME} table`);
                response.status(200).send(result);
            }
        }
    })
}

//Insert new treatment details 
export const saveTreatment = (request, response)=>{
    const {DoctorID, PatientID, TreatmentDetails, TreatmentDate} = request.body;
    const qry = `insert into ${TREATMENTS_TABLE_NAME} (DoctorID, PatientID, TreatmentDetails, TreatmentDate) values(
        ${DoctorID},
        ${PatientID},
        '${TreatmentDetails}',
        '${TreatmentDate}' 
    )`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in entering medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            console.log(result);
            console.log('New Treatment Details Added');
            response.status(200).send({message: 'New Treatment Details Added'});
        }
    })
}

// Fetch patient Medical history by Patient Id
export const fetchPatientTreatmentsDataById = (request, response)=>{
    const {PatientUserId} = request.params;
    const qry = `select * from ${TREATMENTS_TABLE_NAME} where PatientID = (
        select PatientID from ${PATIENTS_TABLE_NAME} where UserID = '${PatientUserId}');`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            if(result.length === 0){
                response.status(400).send({message: `0 Records for patient ${PatientUserId} in ${TREATMENTS_TABLE_NAME} table`});
            }
            else{
                console.log(`fetched ${result.length} records for patient ${PatientUserId}`);
                response.status(200).send(result);
            }
            
        }
    })
    
}

// Remove treatment record by treatment id
export const removerTreatmentRecord = (request, response) =>{
    const {TreatmentID} = request.params;
    const qry = `delete from ${TREATMENTS_TABLE_NAME} where TreatmentID = ${TreatmentID}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error)
            response.status(500).send({message: 'Something went Wrong'})
        }
        else{
            console.log(`Treatment record ${TreatmentID} is deleted from ${TREATMENTS_TABLE_NAME} table`);
            response.status(200).send({message: `Treatment record ${TreatmentID} is removed`});
        }
    })
}

//get single record by treatment id
export const getTreatmentRecordByTreatmentId =(request, response)=>{
    const {TreatmentID} = request.params;
    const qry = `select * from ${TREATMENTS_TABLE_NAME} where TreatmentID = ${TreatmentID}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error)
            response.status(500).send({message: 'Something went Wrong'})
        }
        else{
            if(result.length === 0){
                response.status(404).send({message: `0 Records for treatment id ${TreatmentID} in ${TREATMENTS_TABLE_NAME} table`});
            }
            else{
                console.log(`Treatment record ${TreatmentID} is fetched`);
                console.log(result);
                response.status(200).send(result);
            }
        }
    })
}

//Update Treatment Record
export const updateTreatmentRecord = (request, response)=>{
    const {DoctorID, PatientID, TreatmentDetails} = request.body;
    const {TreatmentID} = request.params;
    const qry = `update ${TREATMENTS_TABLE_NAME} set DoctorID = '${DoctorID}', PatientID = '${PatientID}', TreatmentDetails = '${TreatmentDetails}' 
                where TreatmentID = ${TreatmentID}`;
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in updating medical record: ', error)
            response.status(500).send({message: 'Something went Wrong'})
        }
        else{
            console.log(`Treatment record ${TreatmentID} is update in ${TREATMENTS_TABLE_NAME} table`);
            response.status(200).send({message: `Treatment record ${TreatmentID} is updated`});
        }
    })
}

//Get patient details
export const fetchPatientDetails = (request, response)=>{
    const {PatientUserId} = request.params;
    console.log(PatientUserId);
    const qry_getPatientDetails = `Select * from ${PATIENTS_TABLE_NAME} where UserID = '${PatientUserId}'`;
    connection.query(qry_getPatientDetails, (error, result)=>{
        if(error){
            console.log("Error in fetching medical record: ", error);
            response.status(500).send({message: 'Something went wrong'});
        }
        else{
            if(result.length === 0){
                response.status(200).send({message: `0 Records in ${PATIENTS_TABLE_NAME}`});
            }
            else{
                console.log(`fetched ${result.length} records from ${PATIENTS_TABLE_NAME} table`);
                response.status(200).send(result);
            }
        }
    })
}

//demo (NotConf)
export const deletePatientTreatmentsDataById = (request, response)=>{
    console.log("hello");
    const {TreatmentID} = request.params;
    const qry = `SELECT datediff(sysdate(), TreatmentDate) as date_diff FROM ${TREATMENTS_TABLE_NAME} WHERE TreatmentID = ${TreatmentID}`; 
    connection.query(qry, (error, result)=>{
        if(error){
            console.log('Error in fetching medical record: ', error);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            console.log(result);
            if(result.length === 0){
                response.status(400).send({message: `0 Records for patient ${PatientID} in ${TREATMENTS_TABLE_NAME} table`});
            }
            else{
                const daysDifference = result[0].date_diff;
                if (daysDifference === 0) {
                    console.log("yess");
                    // Proceed to delete the record
                    const deleteQry = `DELETE FROM ${TREATMENTS_TABLE_NAME} WHERE TreatmentID = ${TreatmentID}`;
                    connection.query(deleteQry,(error, result) => {
                        if (error) {
                            console.log('Error in deleting medical record: ', error);
                            response.status(500).send({ message: 'Something went wrong' });
                        } else {
                            response.status(200).send({ message: `Treatment record with ID ${TreatmentID} deleted successfully` });
                        }
                    });
                } 
                else {
                    console.log("Nooo");
                    response.status(400).send({ message: `Cannot delete treatment record older than ${MAX_DAYS} days` });
                }
            }
            
        }
    })
    
}