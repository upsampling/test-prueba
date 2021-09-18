async function GetSettings(request,h){
    try {
        return {
            version:'1.0.3',
            message:'Hola Candidato 01'
        };
    } catch (error) {
        console.log(error);
    }
}

async function PostSettings2(request,h){
    
    try {      
        if(!request.payload || !request.payload.text){
            return h.response({
                text: 'variable no encontrada'
            }).code(400);
        }
         
        return h.response({
            version:'1.1.0',
            message:'Hola Candidato 10', 
            text: request.payload.text
        }).code(200);
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {GetSettings, PostSettings2}