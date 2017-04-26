const Router = require('koa-router'); 

// const authHandler = require('../controllers/authHandler');
const sessionHandlers = require('../controllers/sessionHandlers');

const api = Router();


// api.use('/api/v1/auth/user/login', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
// api.use('/api/v1/auth/user/logout', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
// api.use('/api/v1/auth/user/signup', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
// api.use('/api/v1/auth/wizard/login', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
// api.use('/api/v1/auth/wizard/logout', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);
// api.use('/api/v1/auth/wizard/signup', sessionHandlers.GeneralSessionHandler, sessionHandlers.AuthSessionHanlder);


// api.get('login', '/api/v1/auth/user/login', authHandler.LoginGetHandler); 
// api.post('login', '/api/v1/auth/user/login', authHandler.LoginPostHandler);
// api.get('login', '/api/v1/auth/wizard/login', authHandler.LoginGetHandler); 
// api.post('login', '/api/v1/auth/wizard/login', authHandler.LoginPostHandler);


// api.post('logout', '/api/v1/auth/user/logout', authHandler.LogoutPostHandler);
// api.post('logout', '/api/v1/auth/wizard/logout', authHandler.LogoutPostHandler); 


// api.get('signup', '/api/v1/auth/user/signup', authHandler.SignupGetHandler); 
// api.post('signup', '/api/v1/auth/user/signup', authHandler.SignupPostHandler); 
// api.get('signup', '/api/v1/auth/wizard/signup', authHandler.SignupGetHandler); 
// api.post('signup', '/api/v1/auth/wizard/signup', authHandler.SignupPostHandler); 


module.exports = api;