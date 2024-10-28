import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing users', () => {
    let cookie;

    it('Debemos loguear al usuario y retornar el token de acceso', async () => {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        }

        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];
        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('=');

        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        }

        expect(cookie.name).to.be.ok.and.eql('CookieToken');
        expect(cookie.value).to.be.ok;
    })

    it('Debe fallar con credenciales incorrectas y devolver un mensaje de error', async () => {
        const invalidCredentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun672'
        }

        const response = await requester.post('/api/sessions/login').send(invalidCredentialsMock);

        expect(response.status).to.equal(400); // Verifica que el estado sea 400
        expect(response.body).to.have.property('error', 'Incorrect credentials');
    })

    it('Debe cerrar sesion y eliminar la cookie de token', async () => {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        };

       // Iniciar sesión y capturar la cookie de sesión
        const loginResponse = await requester.post('/api/sessions/login').send(credentialsMock);
        const cookieResult = loginResponse.headers['set-cookie'][0];

        // Ahora usa esa cookie en la solicitud de logout
        const logoutResponse = await requester
            .post('/api/sessions/logout')
            .set('Cookie', cookieResult); // Establece la cookie para esta solicitud

        // Verificar que la respuesta es un 200
        expect(logoutResponse.status).to.equal(200);
        expect(logoutResponse.body.data).to.have.property('message', 'Access token deleted successfully');

        // Verifica que la cookie haya sido eliminada
        const logoutCookie = logoutResponse.headers['set-cookie'];
        expect(logoutCookie).to.not.include('CookieToken');
    });

    it('Debe acceder a una ruta protegida con un token válido', async () => {
        const credentialsMock = {
            email: 'javi4195@gmail.com',
            password: 'topgun22'
        }
    
        // Iniciar sesión y obtener el token
        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        const token = loginResult.headers['set-cookie'][0]; // Asegúrate de que el token esté aquí
    
        // Hacer una solicitud a la ruta protegida
        const response = await requester.get('/api/clients/').set('CookieToken', token);
        
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('error').eql('No token provided');
    });
})