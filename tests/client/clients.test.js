import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing clients', async () => {
    let cookie;
    let cid;

    before(async function() {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        };

        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        
        expect(loginResult.status).to.be.eql(200);
        
        cookie = loginResult.headers['set-cookie'][0];
    });

    it('Debe crear un nuevo cliente satisfactoriamente', async () => {
        const clientsMock = {
            name: 'Conrado',
            lastName: 'Ballon',
            address: 'Nicaragua 2030',
            phone: '3418547845'
        };

        const clientResult = await requester
            .post('/api/clients/')
            .set('Cookie', cookie)
            .send(clientsMock);

        cid = clientResult.body.data._id

        expect(clientResult.statusCode).to.be.eql(201);
        expect(clientResult.body.data).to.have.property('_id');
    });

    it('Debe dar un error al querer ingresar a un cliente ya existente', async () => {
        const clientsMock = {
            name: 'Conrado',
            lastName: 'Ballon',
            address: 'Nicaragua 2030',
            phone: '3418547845'
        };

        const clientResult = await requester
            .post('/api/clients/')
            .set('Cookie', cookie)
            .send(clientsMock);

        expect(clientResult.statusCode).to.be.eql(400);
        expect(clientResult.body).to.have.property('error', 'Client already exists');
    });

    it('Debe dar un error al no enviar todos los datos necesarios para crear un nuevo cliente', async () => {
        const clientsMock = {
            name: 'Conrado',
            lastName: 'Ballon'
        };

        const clientResult = await requester
            .post('/api/clients/')
            .set('Cookie', cookie)
            .send(clientsMock);

        expect(clientResult.statusCode).to.be.eql(400);
        expect(clientResult.body).to.have.property('error', 'The client has not provided all the required values');
    });

    it('Debe dar error al querer actualizar el telefono de un cliente el cual ya existe', async () => {
        const clientsMock = {
            phone: '3418547845'
        };

        const clientResult = await requester
            .put(`/api/clients/${cid}`)
            .set('Cookie', cookie)
            .send(clientsMock);

        expect(clientResult.statusCode).to.be.eql(400);
        expect(clientResult.body).to.have.property('error', 'The phone number has already been taken');
    });

    it('Debe poder actualizar los datos de un cliente correctamente', async () => {
        const clientsMock = {
            name: 'Marta',
            lastName: 'Chamorro',
            address: 'Riobamba 2032',
            phone: '3415941014'
        }

        const clientResult = await requester
            .put(`/api/clients/${cid}`)
            .set('Cookie', cookie)
            .send(clientsMock);
        
        expect(clientResult.statusCode).to.be.eql(200);
    });


    it('Debe eliminar a un cliente satisfactoriamente', async () => {
        const clientResult = await requester
            .delete(`/api/clients/${cid}`)
            .set('Cookie', cookie);
        
        expect(clientResult.statusCode).to.be.eql(200);
    });
})

