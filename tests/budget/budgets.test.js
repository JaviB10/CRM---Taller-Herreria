import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing budgets', async () => {
    let cookie;
    let bid;
    let mid;
    let cid;
    let jid;

    before(async function() {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        };

        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        
        expect(loginResult.status).to.be.eql(200);
        
        cookie = loginResult.headers['set-cookie'][0];

        const clientsMock = {
            name: 'Renata',
            lastName: 'Ballon',
            address: 'Cerrito 7500',
            phone: '3417845941'
        }

        const clientResult = await requester
            .post('/api/clients/')
            .set('Cookie', cookie)
            .send(clientsMock);

        cid = clientResult.body.data._id

        expect(clientResult.statusCode).to.be.eql(201);
       
        const jobsMock = {
            details: 'Mesa ratonera para living'
        }

        const jobResult = await requester
            .post(`/api/jobs/${cid}`)
            .set('Cookie', cookie)
            .send(jobsMock)
        
        jid = jobResult.body.data._id

        expect(jobResult.statusCode).to.be.eql(201);
    });

    it('Debe verificar correctamente que el budget esta creado e incluido dentro del trabajo', async () => {
        const jobResult = await requester
            .get(`/api/jobs/${jid}`)
            .set('Cookie', cookie)
        
        bid = jobResult.body.data.budget._id;

        expect(jobResult.statusCode).to.be.eql(200);
        expect(jobResult.body.data.budget).to.have.property('_id');
    });

    it('Debe dar error al querer actualizar al presupuesto datos que se calculan solos', async ( ) => {
        const budgetsMock = {
            labourCost: 1000000,
            totalMaterialCost: 2000,
            paidAmount: 10000
        }

        const budgetResult = await requester
            .put(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
            .send(budgetsMock)
        
        expect(budgetResult.statusCode).to.be.eql(400);
        expect(budgetResult.body).to.have.property('error', 'Cannot directly update totalMaterialCost, paidAmount, or paymentStatus. Use the appropriate methods to update these values.');

    });

    it('Debe actualizar correctamente la mano de obra del presupuesto', async () => {
        const budgetsMock = {
            labourCost: 1000000
        }

        const budgetResult = await requester
            .put(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
            .send(budgetsMock)
        
        expect(budgetResult.statusCode).to.be.eql(200);

        const updatedBudgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)

        expect(updatedBudgetResult.body.data.labourCost).to.be.eql(1000000)
    });

    it('Debe ingresar un nuevo material satisfactoriamente y cambiar los valores correspondientes que se calculan solos', async () => {
        const materialMock = {
            materialName: 'Clavos',
            amount: 100,
            price: 30
        }

        const materialResult = await requester
            .put(`/api/budgets/material/${bid}`)
            .set('Cookie', cookie)
            .send(materialMock)
        
        expect(materialResult.statusCode).to.be.eql(200);

        const updatedBudgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
        
        mid = updatedBudgetResult.body.data.materials[0]._id;  

        expect(updatedBudgetResult.body.data.totalMaterialCost).to.be.eql(3000);
    });

    it('Debe eliminar un material satisfactoriamente y cambiar los valores correspondientes que se calculan solos', async () => {
        const materialResult = await requester
            .get(`/api/budgets/remove/${bid}/${mid}`)
            .set('Cookie', cookie)
        
        expect(materialResult.statusCode).to.be.eql(200);

        const updatedBudgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)

        expect(updatedBudgetResult.body.data.totalMaterialCost).to.be.eql(0);
    })

    it('Debe eliminar tanto al cliente creado como al trabajo satisfactoriamente', async () => {
        const clientResult = await requester
            .delete(`/api/clients/${cid}`)
            .set('Cookie', cookie)
        
        expect(clientResult.statusCode).to.be.eql(200);

        const jobResult = await requester
            .delete(`/api/jobs/${jid}`)
            .set('Cookie', cookie)
        
        expect(jobResult.statusCode).to.be.eql(200);
    });
})