const { Router } = require('express');

const menuRoutes = require('./menuRoutes');
const studentRoutes = require('./studentRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const newsRoutes = require('./newsRoutes');
const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');

const routes = Router();

routes.use('/cardapio', menuRoutes);
routes.use('/alunos', studentRoutes);
routes.use('/estatisticas', statisticsRoutes);
routes.use('/noticias', newsRoutes);
routes.use('/users', usersRoutes);
routes.use('/', loginRoutes);

module.exports = routes;
