const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('List incident route', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to list the incidents', async () => {
        const createOngResponse = await request(app)
		  .post('/ongs')
		  .send({
			name: "Teste Validação",
			email: "teste@teste.com",
			whatsapp: "11900000000",
			city: "São Luís",
			uf : "MA"
		  });

		 const createIncidentResponse = await request(app)
			.post('/incidents')
			.set('Authorization', createOngResponse.body)
			.send({
				title: "Teste de Valdiação",
				description: "Validação do body e headers",
				value: "500"
			})

        const response = await request(app).get('/incidents');

        expect(response.status).toBe(200);
        expect(createIncidentResponse.body).toHaveProperty('id');
    });

	it('Should not be able send a invalid page header(It is not a number)', async () => {
		const createOngResponse = await request(app)
		  .post('/ongs')
		  .send({
			name: "Teste Validação",
			email: "teste@teste.com",
			whatsapp: "11900000000",
			city: "São Luís",
			uf : "MA"
		  });

		 const createIncidentResponse = await request(app)
			.post('/incidents')
			.set('Authorization', createOngResponse.body)
			.send({
				title: "Teste de Valdiação",
				description: "Validação do body e headers",
				value: "500"
			})

		const response = await request(app)
		  .get('/incidents')
		  .query({ page: 'asd' });

		  expect(response.status).toBe(400);
		  expect(response.body).toHaveProperty('message', "\"page\" must be a number");
	})
});