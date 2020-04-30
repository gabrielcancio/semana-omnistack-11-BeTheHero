const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        evento: "Semana Omnnistack",
        versão: 11.0,
        aluno: "Gabriel Cancio"
    });
});

module.exports = routes;