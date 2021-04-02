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
    this.read = (filter, page = 0, numberItems = 6 ) => {
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




module.exports = { DataBase };