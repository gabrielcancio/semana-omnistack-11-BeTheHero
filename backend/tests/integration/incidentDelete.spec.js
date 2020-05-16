const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Delete incident route', () => {
	beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

    });

    afterAll(async () => {
        await connection.destroy();
    });

	it('Should be able to delete a incident', async () => {
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
          .delete(`/incidents/${createIncidentResponse.body.id}`)
          .set('Authorization', createOngResponse.body);
        
        expect(response.status).toBe(204);
	})

	it('should not be able to delte a incident without Autthorization header', async () => {
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
			.delete(`/incidents/${createIncidentResponse.body.id}`)

		  expect(response.status).toBe(401);
		  expect(response.body).toHaveProperty('error', 'Operation not permited');
	});

	it('Should not be able send a invalid id(It is not a number)', async () => {
		await request(app)
		  .post('/ongs')
		  .send({
			name: "Teste Validação",
			email: "teste@teste.com",
			whatsapp: "11900000000",
			city: "São Luís",
			uf : "MA"
		  });
		
          const response = await request(app)
			.delete(`/incidents/asd`)

		  expect(response.status).toBe(400);
		  expect(response.body).toHaveProperty('message', "\"id\" must be a number");
	});
});   