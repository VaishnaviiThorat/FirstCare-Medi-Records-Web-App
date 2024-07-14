import jwt from 'jsonwebtoken';

export const verifyTokenPatient = (request, response, next)=>{
    const header = request.get('Authorization');
    if(header){
        const token = header.split(" ")[1];
        jwt.verify(token, 'DhoomDham', (error, payload)=>{
            if(error){
                response.status(401).send({message: 'Patient Token is invalid', token: token})
            }
            else{
                next();
            }
        })
    }
    else{
        response.status(401).send({message: 'Unauthorized User'});
    }
}