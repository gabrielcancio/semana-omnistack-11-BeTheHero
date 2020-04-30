const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: "Semana Omnnistack",
        versão: 11.0,
        aluno: "Gabriel Cancio"
    });
});

app.listen(3333);