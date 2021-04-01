let DB = require('../db.json');

const uuid = require('uuid');
const fs = require('fs');

function DataBase() {

    this.create = (provider) => {
        DB.push({ ...provider, id: uuid.v4() });
        const data = JSON.stringify(DB);
        fs.writeFileSync('db.json', data);
        return 'item saved';
    }
    this.read = (filter, page = 0, numberItems = 5 ) => {
        const switchConfition = filter ? Object.keys(filter)[0] : '';
        let response = [];
        switch (switchConfition) {
            case 'id':
                response = DB.find(item => {
                    return item.id == filter.id;
                })
                break;
            case 'name':
                response = DB.find(item => {
                    return item.name == filter.name;
                })
                break;

            default:
                const floor = page * numberItems;
                response = DB.slice(floor, floor + numberItems);
                break;
        }
        return response;
    }
    this.update = (id, properties) => {
        const provider = DB.findIndex(item => {
            return item.id == id
        });
        if (provider != undefined) {
            const keys = Object.keys(properties);
            keys.map(item => {
                DB[provider][item] = properties[item];
            });

            const data = JSON.stringify(DB);
            fs.writeFileSync('db.json', data);
            return 'item updated';
        }
        return 'item not found';
    }
    this.delete = (id) => {
        const provider = DB.findIndex(item => {
            return item.id == id
        });
        if (provider != undefined) {
            DB.splice(provider, 1);
            const data = JSON.stringify(DB);
            fs.writeFileSync('db.json', data);
            return 'item removed';
        }
        return 'item not found';
    }
}

/*(()=>{
    const db1 = new DataBase();
    const rp = db1.delete('19d50f7a-6706-4d7a-bfc3-30b8c59da683');
    console.log(rp);
})()*/
/*(()=>{
    const db1 = new DataBase();
    const rp = db1.read();
    console.log(rp);
    const rp1 = db1.read({id:'7a3b81ce-9cd8-4b02-8976-627a650eb572'});
    console.log(rp1);
    const rp2 = db1.read({name:'Ornelas S.A.'});
    console.log(rp2)
})()*/
/*(()=>{
    const db1 =  new DataBase();
    const resp = db1.create({"name":"Comercializadora SA de CV","email":"LuRE1@nearbpo.com","phone":"568 547 796","address":"671 Hugo Parcela","debt":"0","status":false})
    console.log(resp);
})()*/
/*(()=>{
    const db1 = new DataBase();
    const rp = db1.update('617faf88-4c6a-41e2-9b9c-49f055efe35a',{email:'perltaborrego@yopmail.com',phone:'553366882'})
    console.log(rp);
})()*/


module.exports = { DataBase };