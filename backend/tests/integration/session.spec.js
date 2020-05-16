const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile route', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to make a session', async () => {
        const createOngResponse = await request(app)
		  .post('/ongs')
		  .send({
			name: "Teste Validação",
			email: "teste@teste.com",
			whatsapp: "11900000000",
			city: "São Luís",
			uf : "MA"
          });
          
        const response = await request(app)
            .post('/session')
            .send({
                id: createOngResponse.body.id
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
    });

    it('Should not be able to make a sessionwith invalid id', async() => {
        const response = await request(app)
            .post('/session')
            .send({
                id: '73c02212'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'No ONG found with this id.');
    })
});