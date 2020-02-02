const { Router } = require('express');
const cardapio = require('./controllers/cardapioController');
const aluno = require('./controllers/alunoController');
const info = require('./controllers/informacaoController');
const user = require('./controllers/userController');
const login = require('./controllers/loginController');
const auth = require('./auth.routes');

const routes = Router();

routes.get('/cardapio/:page', cardapio.readAll);
routes.get('/cardapio/:id', cardapio.readOne);
routes.get('/cardapio/avg/:id', cardapio.average);
routes.post('/cardapio', auth, cardapio.create);
routes.post('/cardapio/avaliar/:id', cardapio.rate);
routes.post('/cardapio/comentar/:id', cardapio.comment);
routes.put('/cardapio/:id', auth, cardapio.update);
routes.delete('/cardapio/:id', auth, cardapio.delete);

routes.post('/alunos', aluno.create);
routes.get('/alunos', auth, aluno.readAll);
routes.get('/alunos/:id', auth, aluno.readOne);

routes.post('/informacoes', auth, info.create);
routes.get('/informacoes', info.read);
routes.put('/informacoes/:id', auth, info.update);
routes.delete('/informacoes/:id', auth, info.delete);

routes.post('/users', user.create);
routes.get('/users', auth, user.read);
routes.put('/users/:id', auth, user.update);
routes.delete('/users/:id', auth, user.delete);

routes.post('/login', login.create);

module.exports = routes;
