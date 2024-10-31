import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing jobs', () => {
    let cookie;
    let cid;
    let jib;
    
    before(async function() {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        };

        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        
        expect(loginResult.status).to.be.eql(200);
        
        cookie = loginResult.headers['set-cookie'][0];

        const clientsMock = {
            name: 'Liliana',
            lastName: 'Ballon',
            address: '3 de febrero 3400',
            phone: '3414562312'
        }

        const clientResult = await requester
            .post('/api/clients/')
            .set('Cookie', cookie)
            .send(clientsMock);

        cid = clientResult.body.data._id

        expect(clientResult.statusCode).to.be.eql(201);
    });

    after(async function() {
        const clientRestult = await requester
            .delete(`/api/clients/${cid}`)
            .set('Cookie', cookie)
        
        expect(clientRestult.statusCode).to.be.eql(200)
    })

    it('Debe crar un nuevo trabajo para un cliente', async () => {
        const jobsMock = {
            details: 'Realizacion de un porton para el frente de la casa'
        }

        const jobResult = await requester
            .post(`/api/jobs/${cid}`)
            .set('Cookie', cookie)
            .send(jobsMock)
        
        jib = jobResult.body.data._id
        
        expect(jobResult.statusCode).to.be.eql(201);
        expect(jobResult.body.data).to.have.property('_id');
    });

    it('Debe dar un error al querer crear un nuevo trabajo y no logra encontrar al cliente', async () => {
        const jobsMock = {
            details: 'Porton para frente de la casa'
        }

        const id = '671003ebe864e9eeae269367'

        const jobResult = await requester
            .post(`/api/jobs/${id}`)
            .set('Cookie', cookie)
            .send(jobsMock)
        
        expect(jobResult.statusCode).to.be.eql(404);
        expect(jobResult.body).to.have.property('error', 'Client not found');
    });

    it('Debe crear una fecha nueva al aceptar el presupuesto', async () => {
        const jobsMock = {
            budgetAccepted: true
        }

        const jobResult = await requester
            .put(`/api/jobs/${jib}`)
            .set('Cookie', cookie)
            .send(jobsMock)
    
        expect(jobResult.statusCode).to.be.eql(200);
        expect(jobResult.body.data).to.have.property('acceptedAt').that.is.a('string');
    });

    it('Debe dar error al querer eliminar el trabajo y que el presupuesto este aceptado', async () => {
        const jobResult = await requester
            .delete(`/api/jobs/${jib}`)
            .set('Cookie', cookie)
            
        expect(jobResult.statusCode).to.be.eql(400);
        expect(jobResult.body).to.have.property('error', 'The job has a budget that is accepted');
    });

    it('Debe crear una fecha nueva al finalizar el trabajo', async () => {
        const jobsMock = {
            isFinished: true
        }

        const jobResult = await requester
            .put(`/api/jobs/${jib}`)
            .set('Cookie', cookie)
            .send(jobsMock)
    
        expect(jobResult.statusCode).to.be.eql(200);
        expect(jobResult.body.data).to.have.property('finishAt').that.is.a('string');
    });

    it('Debe devolver a los valores por defecto a las fechas luego de actualizar los booleanos', async () => {
        const jobsMock = {
            isFinished: false,
            budgetAccepted: false
        }

        const jobResult = await requester
            .put(`/api/jobs/${jib}`)
            .set('Cookie', cookie)
            .send(jobsMock)
        
        expect(jobResult.statusCode).to.be.eql(200);
        expect(jobResult.body.data.finishAt).to.be.null;
        expect(jobResult.body.data.acceptedAt).to.be.null;
    });

    it('Debe eliminar el trabajo satisfactoriamente', async () => {
        const jobResult = await requester
            .delete(`/api/jobs/${jib}`)
            .set('Cookie', cookie)
            
        expect(jobResult.statusCode).to.be.eql(200);
    });
})