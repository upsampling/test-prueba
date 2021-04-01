const { DataBase } = require('../drivers/database');

const {validate} = require('jsonschema');
const _ = require('lodash');

const schema = {
    type: "object",
    properties: {
      name : { 
        type: "string",
        minLength: 2, 
        maxLength: 60 
      },
      email : {
          type:"string",
          format:"email"
      },
      phone : {
          type : "string",
          minLength: 10, 
          maxLength: 20 
      },
      address : {
          type : "string",
          minLength: 5, 
          maxLength: 100 
      },
      debt : {
        type : "string",
        minLength: 0, 
        maxLength: 10
      }
    },
    required : ["name","email","phone","address","debt"],
    additionalProperties:false
  }

async function GetProvider(request,h){
    try {
        const {id} = request.params;
        let {page,numberItems} = request.query;

        if(page){
            page = parseInt(page);
        }
        if(numberItems){
            numberItems = parseInt(numberItems);
        }

        const conection = new DataBase();
        let result = [];
        if(id){
            result = conection.read({id});
        }else{
            result = conection.read("",page,numberItems);
        }
        
        if(result.length != 0){
            return h.response(result).code(200);
        }
        return h.response({msg:'no data'}).code(204);
        
    } catch (error) {
        console.log(error);
        return h.response({msg:'internal error'}).code(500);
    }
}
async function PutProvider(request,h){
    try {
        let schemaNoReq = _.cloneDeep(schema);
        delete schemaNoReq.required;

        if (!validate(request.payload, schemaNoReq).valid){
            return h.response({msg:"esquema no valido"}).code(400);
        }

        const {id} = request.params;
        let result = [];
        if(!id){
            return h.response({msg:'id mandatory'}).code(400);
        }

        const conection = new DataBase();
        result = conection.update(id,request.payload);
        
        if(result != 'item not found'){
            return h.response({msg:result}).code(200);
        }
        return h.response({msg:result}).code(404);
    } catch (error) {
        console.log(error);
        return h.response({msg:'internal error'}).code(500);
    }
}
async function DeleteProvider(request,h){
    try {
        const {id} = request.params;
        const conection = new DataBase();
        let result = [];
        if(!id){
            return h.response({msg:'id mandatory'}).code(400);
        }

        result = conection.delete(id);
        
        if(result != 'item not found'){
            return h.response({msg:result}).code(200);
        }
        return h.response({msg:result}).code(404);
    } catch (error) {
        console.log(error);
        return h.response({msg:'internal error'}).code(500);
    }
}
async function PostProvider(request,h){
    try {
        if (!validate(request.payload, schema).valid){
            return h.response({msg:"esquema no valido"}).code(400);
        }
        const conection = new DataBase();
        const result = conection.create(request.payload);
        return h.response({msg:result}).code(200);
    } catch (error) {
        console.log(error);
        return h.response({msg:'internal error'}).code(500);
    }
}

module.exports = {GetProvider,PutProvider,DeleteProvider,PostProvider};