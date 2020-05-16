const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');



describe('Create incident route', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new incident', async () => {
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
          .post('/incidents')
          .set('Authorization', createOngResponse.body )
          .send({
            title: "Teste de Valadiação",
            description: "Validação do body e headers",
            value: "500"
          });

          expect(createOngResponse.body).toHaveProperty('id')
          expect(response.body).toHaveProperty('id')
          expect(response.status).toBe(200)
    });

    it('Should not be able to create a incident with empty properties', async () => {
      const createOngResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Teste Validação",
        email: "teste@teste.com",
        whatsapp: "11900000000",
        city: "São Luís",
        uf : "MA"
      });

      const titleEmpty = await request(app)
        .post('/incidents')
        .set('Authorization', createOngResponse.body)
        .send({
          title: "",
          description: "Descrição teste",
          value: "500"
        });

        const descriptionEmpty = await request(app)
        .post('/incidents')
        .set('Authorization', createOngResponse.body)
        .send({
          title: "Test",
          description: "",
          value: "500"
        });

        const valueEmpty = await request(app)
        .post('/incidents')
        .set('Authorization', createOngResponse.body)
        .send({
          title: "Teste",
          description: "Descrição teste",
          value: ""
        });

        expect(createOngResponse.body).toHaveProperty('id');
        expect(createOngResponse.status).toBe(200);

        expect(titleEmpty.status).toBe(400);
        expect(titleEmpty.body).toHaveProperty('message', "\"title\" is not allowed to be empty");

        expect(descriptionEmpty.status).toBe(400);
        expect(descriptionEmpty.body).toHaveProperty('message', "\"description\" is not allowed to be empty");

        expect(valueEmpty.status).toBe(400);
        expect(valueEmpty.body).toHaveProperty('message', "\"value\" must be a number");
    });

    it('Should not be able to create a incident without Authorization header', async () => {
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
        .post('/incidents')
        .send({
          title: "",
          description: "Descrição teste",
          value: "500"
        });

        expect(response.status).toBe(400);
		    expect(response.body).toHaveProperty('message', "\"authorization\" is required");
		
		    expect(createOngResponse.body).toHaveProperty('id');
    });
  
});