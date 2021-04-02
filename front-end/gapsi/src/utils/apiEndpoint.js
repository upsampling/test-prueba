const baseUrl = 'http://localhost:4000';

function settingsGet(){
    return {
        method: 'GET',
        url: baseUrl+'/settings', 
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

module.exports = {
    settingsGet
}