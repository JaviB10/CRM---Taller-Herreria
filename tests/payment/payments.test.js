import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing payments', async () => {
    let cookie;
    let cid;
    let jid;
    let bid;
    let pid;

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

        const getJobResult = await requester
            .get(`/api/jobs/${jid}`)
            .set('Cookie', cookie)
        
        bid = getJobResult.body.data.budget._id;

        expect(jobResult.statusCode).to.be.eql(200);
    });

    it('Debe crear satisfactoriamente un pago y agregarlo al presupuesto cambiando los valores que se calculan solos', async () => {

        const paymentsMock = {
            amount: 25000,
            paymentMethod: 'Transferencia'
        }

        const paymentResult = await requester
            .post(`/api/payments/${bid}`)
            .set('Cookie', cookie)
            .send(paymentsMock)
        
        expect(paymentResult.statusCode).to.be.eql(201);

        pid = paymentResult.body.data._id;

        const budgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
        
        expect(budgetResult.statusCode).to.be.eql(200);
        expect(budgetResult.body.data.paidAmount).to.be.eql(250000);
        expect(budgetResult.body.data.paymentStatus).to.be.eql('Parcialmente Pagado');
    });

    it('Debe dar error al querer crear un nuevo pago y no haber enviado todos los datos', async () => {
        const paymentsMock = {
            amount: 25000
        }

        const paymentResult = await requester
            .post(`/api/payments/${bid}`)
            .set('Cookie', cookie)
            .send(paymentsMock)
        
        expect(paymentResult.statusCode).to.be.eql(400);
        expect(paymentResult.body.data).to.have.property('error', 'The payment has not provided all the required values');
    });

    it('Debe actualizar el pago satisfactoriamente y cambiar los valores en el presupuesto', async () => {
        const paymentsMock = {
            amount: 20000,
            paymentMethod: 'Efectivo'
        }

        const paymentResult = await requester
            .put(`/api/payments/${bid}`)
            .set('Cookie', cookie)
            .send(paymentsMock)
        console.log(paymentResult.body);
        
        expect(paymentResult.statusCode).to.be.eql(200);

        const budgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
        
        expect(budgetResult.statusCode).to.be.eql(200);
        expect(budgetResult.body.data.paidAmount).to.be.eql(200000);
        expect(budgetResult.body.data.paymentStatus).to.be.eql('Parcialmente Pagado');
    });

    it('Debe eliminar el payment satisfactoriamente y cambiar los valores correspondientes en el presupuesto', async () => {
        const paymentResult = await requester
            .delete(`/api/payments/${pid}`)
            set('Cookie', cookie)
        
        expect(paymentResult.statusCode).to.be.eql(200);

        const budgetResult = await requester
            .get(`/api/budgets/${bid}`)
            .set('Cookie', cookie)
        
        expect(budgetResult.statusCode).to.be.eql(200);
        expect(budgetResult.body.data.paidAmount).to.be.eql(0);
        expect(budgetResult.body.data.paymentStatus).to.be.eql('No pagado');
    });

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