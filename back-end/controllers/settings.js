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

module.exports = {GetSettings}