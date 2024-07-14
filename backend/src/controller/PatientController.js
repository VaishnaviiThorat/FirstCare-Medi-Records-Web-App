import { compareSync, hashSync } from "bcrypt";
import { PATIENTS_TABLE_NAME } from "../constants/DbConstants.js";
import { connection } from "../utility/DbUtil.js";
import jwt from 'jsonwebtoken';

// Register new Patient
export const registerPatient = (request, response)=>{
    const {UserID, Password, FullName, DateOfBirth, Gender, Address, Phone} = request.body;
    const PatientUserID = `P${UserID}`;
    const qry_PatientExists = `Select * from ${PATIENTS_TABLE_NAME} where UserID = '${PatientUserID}'`;
    connection.query(qry_PatientExists, (error, result)=>{
        if(error){
            console.error('Error querying database: ', err);
            response.status(500).send({message: 'Something went Wrong'});
        }
        if(result.length > 0){
            response.status(400).send({message: `Patient ${PatientUserID} already exists`});
            return;
        }
        else{
            const encryptedPassword = hashSync(Password, 10);
            const qry = `Insert into ${PATIENTS_TABLE_NAME} (UserID, Password, FullName, DateOfBirth, Gender, Address, Phone) 
                        values ('${PatientUserID}', '${encryptedPassword}', 
                                '${FullName}', '${DateOfBirth}', '${Gender}', 
                                '${Address}', '${Phone}'
                        )`;
            connection.query(qry, (error, result)=>{
                if(error){
                    console.error('Error querying database: ', err);
                    response.status(500).send({message: 'Something went Wrong'});
                }
                else{
                    console.log(`Patient ${PatientUserID} registered succesfully`);
                    response.status(200).send({message: `Patient ${PatientUserID} registered succesfully`});
                }
            });
        }
    })
}

//Login of Patient
export const patientLogin = (request, response)=>{
    const {userId, password} = request.body;
    const qry_PatientExists = `Select * from ${PATIENTS_TABLE_NAME} where UserID = '${userId}'`;
    connection.query(qry_PatientExists, (error, result)=>{
        if(error){
            console.error('Error querying database: ', err);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            if(result.length === 0){
                console.log(`Invalid User Name or patient ${userId} is not registered`);
                response.status(400).send({message: `Invalid User Name or patient ${userId} is not registered`});
            }
            else{
                const userPatient = result[0];
                const encryptedPassword = userPatient.Password;
                if(compareSync(password, encryptedPassword)){
                    const token = jwt.sign({UserID: userPatient.UserID}, "DhoomDham");
                    response.status(200).send(
                        {
                            message: 'Patient Login Successful',
                            token: token
                        }
                    );
                }
                else{
                    console.log(`Invalid Password or doctor ${userId}`);
                    response.status(400).send({message: `Invalid Password`});
                }
            }
        }
    })
}