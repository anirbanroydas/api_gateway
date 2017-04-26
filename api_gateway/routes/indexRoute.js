const Router = require('koa-router'); 

const indexHandler = require('../controllers/indexHandler');
const sessionHandlers = require('../controllers/sessionHandlers');

const api = Router();


api.use('/', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);

api.get('index', '/', indexHandler.IndexGetHandler); 

module.exports = api;