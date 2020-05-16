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

    it('Should be able to list incidents of a specific ONG', async() => {
        const createOngResponse = await request(app)
		  .post('/ongs')
		  .send({
			name: "Teste Validação",
			email: "teste@teste.com",
			whatsapp: "11900000000",
			city: "São Luís",
			uf : "MA"
		  });

		 await request(app)
			.post('/incidents')
			.set('Authorization', createOngResponse.body)
			.send({
				title: "Teste de Validiação",
				description: "Validação do body e headers",
				value: "500"
            });
            
        const response = await request(app)
            .get('/profile')
            .set('Authorization', createOngResponse.body);

        expect(response.status).toBe(200);
    });

    it('should not be able to list incidents with invalid id', async () => {
            
        const response = await request(app)
            .get('/profile')
            .query({Authorization:'f144a7c5'});

        expect(response.status).toBe(400);
    });
})