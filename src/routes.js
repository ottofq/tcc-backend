const { Router } = require('express');
const cardapio = require('./controllers/cardapioController');
const aluno = require('./controllers/alunoController');

const routes = Router();

routes.get('/cardapio/:page', cardapio.readAll);
routes.get('/cardapio/:id', cardapio.readOne);
routes.get('/cardapio/avg/:id', cardapio.average);
routes.post('/cardapio', cardapio.create);
routes.post('/cardapio/avaliar/:id', cardapio.rate);
routes.post('/cardapio/comentar/:id', cardapio.comment);
routes.put('/cardapio/:id', cardapio.update);
routes.delete('/cardapio/:id', cardapio.delete);

routes.post('/alunos', aluno.create);
routes.get('/alunos', aluno.readAll);
routes.get('/alunos/:id', aluno.readOne);

module.exports = routes;
