const Router = require('koa-router'); 

const botHandler = require('../controllers/botHandler');
const sessionHandlers = require('../controllers/sessionHandlers');

const api = Router();


api.use('/api/v1/bot/start', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
api.use('/api/v1/bot/query', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);

api.get('bot', '/api/v1/bot/start', botHandler.BotGetHandler);
api.post('bot_query', '/api/v1/bot/query', botHandler.BotQueryHandler); 


module.exports = api;