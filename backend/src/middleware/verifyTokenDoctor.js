import jwt from 'jsonwebtoken';

export const verifyTokenDoctor = (request, response, next) =>{
    const header = request.get('Authorization');
    if(header){
        const token = header.split(" ")[1];
        jwt.verify(token, 'DhoomDhadam', (error, payload)=>{
            if(error){
                response.status(401).send({message: 'Doctor Token is invalid', token: token})
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