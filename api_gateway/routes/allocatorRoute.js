const Router = require('koa-router'); 

const allocatorHandler = require('../controllers/allocatorHandler');
const sessionHandlers = require('../controllers/sessionHandlers');

const api = Router();


api.use('/api/v1/allocate/:userid', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);


api.post('allocator', '/api/v1/allocate/:userid', allocatorHandler.AllocatorPostHandler);



module.exports = api;