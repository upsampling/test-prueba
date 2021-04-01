async function GetSettings(request,h){
    try {
        return {apiVersion:'1.0.3'};
    } catch (error) {
        console.log(error);
    }
}

module.exports = {GetSettings}