function setTimeoutAsync(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },time);
    });
}
module.exports = {setTimeoutAsync};