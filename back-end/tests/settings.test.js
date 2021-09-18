const request = require('supertest');
const direction = 'http://localhost:4000';


describe("POST /settings2", ()=>{

    it('retorna el mismo texto que se le envía', async()=>{
        const text = {text: 'hola mundo'};
        const response = await request(direction).post('/settings2').send(text);

        expect(response.body.text).toEqual(text.text);
        expect(response.statusCode).toEqual(200);
    })

    it('se retorna un 400', async()=>{
        const response = await request(direction).post('/settings2').send();
        expect(response.statusCode).toEqual(400);
    })
})