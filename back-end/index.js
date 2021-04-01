const Hapi = require('@hapi/hapi');
const _ = require('lodash');
const faker = require('faker/locale/es_MX');
const uuid = require('uuid');

const router = require('./router');


function generateDB(){
    const fs = require('fs');
    const db = _.times(20,()=>{
        const bool = faker.random.boolean();
        return {
            id:uuid.v4(),
            name:faker.company.companyName(),
            email:faker.internet.email(),
            phone:faker.phone.phoneNumber(),
            address:faker.address.streetAddress(),
            debt:bool?faker.finance.amount(0,100000):'0',
            status:bool
        }
    });
    const data = JSON.stringify(db);
    fs.writeFileSync('db.json', data);
    console.log(db);
}

async function init(){
    try {
        const serverInfo = {
            port:3000,
            host:'localhost',
            routes: {
                cors: {
                    origin: ['*']           
                }
            }
        }
        const server = Hapi.server(serverInfo);

        server.route(router);
    
        await server.start();
        console.log('server running on port 3000');
    } catch (error) {
        console.log("error->",error);
    }
}

(()=>{
    init();
    //generateDB();
})();