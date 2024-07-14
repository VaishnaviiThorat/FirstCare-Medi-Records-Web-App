import express from "express";
import { connection } from "./src/utility/DbUtil.js";
import patientTreatmentRouter from "./src/router/patientTreatmentRouter.js";
import { PORT } from "./src/constants/DbConstants.js";
import doctorRouter from "./src/router/DoctorRouter.js";
import patientRouter from "./src/router/PatientRouter.js";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use("/patient-treatments", patientTreatmentRouter);
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter)


app.listen(PORT, ()=>{
    connection.connect((error)=>{
        if(error){
            console.log("There some error conneting with data base");
            console.log(error)
        }
        else{
            console.log("Db Connected");
        }
    })
    console.log(`Server is running on port ${PORT}`);
});