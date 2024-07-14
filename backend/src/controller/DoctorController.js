import { compareSync, hashSync } from "bcrypt";
import { DOCTORS_TABLE_NAME } from "../constants/DbConstants.js";
import { connection } from "../utility/DbUtil.js";
import jwt from "jsonwebtoken";

//Register new Doctor
export const registerDoctor = (request, response)=>{
    const{UserID, Password, FullName, Specialization, LicenseNumber, Address, Phone} = request.body;
    const DocterUserID = `D${UserID}`;
    const qry_doctorExists = `Select * from ${DOCTORS_TABLE_NAME} where UserID = '${DocterUserID}'`;
    connection.query(qry_doctorExists, (error, result)=>{
        if(error){
            console.error('Error querying database: ', err);
            response.status(500).send({message: 'Something went Wrong'});
        }
        if(result.length > 0){
            response.status(400).send({message: `Doctor ${DocterUserID} already exists`});
            return;
        }
        else{
            const encryptedPassword = hashSync(Password, 10);
            const qry = `insert into ${DOCTORS_TABLE_NAME} 
            (UserID, Password, FullName, Specialization, LicenseNumber, Address, Phone)
            values ('${DocterUserID}', '${encryptedPassword}', '${FullName}', '${Specialization}', 
                '${LicenseNumber}', '${Address}', '${Phone}'
            )`;
            connection.query(qry, (error, result)=>{
                if(error){
                    console.error('Error querying database: ', err);
                    response.status(500).send({message: 'Something went Wrong'});
                }
                else{
                    console.log(`Doctor ${DocterUserID} registered succesfully`);
                    response.status(200).send({message: `Doctor ${DocterUserID} registered succesfully`});
                }
            })
        }
    })
}

// Doctor Login
export const doctorLogin = (request, response)=>{
    const{userId, password} = request.body;
    const qry_doctorExists = `Select * from ${DOCTORS_TABLE_NAME} where UserID = '${userId}'`;
    connection.query(qry_doctorExists, (error, result)=>{
        if(error){
            console.error('Error querying database: ', err);
            response.status(500).send({message: 'Something went Wrong'});
        }
        else{
            if(result.length === 0){
                console.log(`Invalid User Name or doctor ${userId} is not registered`);
                response.status(400).send({message: `Invalid User Name or doctor ${userId} is not registered`});
            }
            else{
                const userDocter = result[0];
                const encryptedPassword = userDocter.Password;
                if(compareSync(password, encryptedPassword)){
                    const token = jwt.sign({UserID: userDocter.UserID}, 'DhoomDhadam');
                    response.status(200).send(
                        {
                            message: `Doctor Login successful`, 
                            token: token
                        }
                    );
                }
                else{
                    console.log(`Invalid Password of doctor ${userId}`);
                    response.status(400).send({message: `Invalid Password`});
                }
            }
        }
    })
}