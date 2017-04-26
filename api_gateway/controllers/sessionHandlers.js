const logger = require('../middlewares/logger');

const log = logger.log;

// General Session Handler/Controller to handle all sessions 
async function GeneralSessionHandler(ctx, next) {
	ctx.log.debug('inside GeneralSessionHandler');
	let sess = ctx.session;

	sess.stats = sess.stats || null;

	if (sess.stats === null) {
		// first time session data creation
		sess.stats = {
			total_count : 0,
			index_count : 0,
			chat_count : 0,
			login_count : 0,
			login_attempts : 0,
			signup_count: 0,
			signup_attempts: 0,
			successfull_attempts : 0,
			unsuccessfull_attempts : 0,
			unauthenticated_req_count : 0,
			authenticated_req_count : 0
  		};
  	}

  	sess.stats.total_count++;
  	ctx.log.debug('sess: ', sess);
  	await next();
  	
}



// session hanlder to handle authorizations
async function AuthSessionHanlder(ctx, next) {
	ctx.log.debug('inside AuthSessionHanlder');
	let sess = ctx.session;

	sess.info = sess.info || null;
	ctx.state = ctx.state || {};

	if (sess.info === null || !sess.info.isValid) {
		ctx.log.debug('Unauthorized user.');
		
		ctx.state.isAuthenticated = false;
		sess.stats.unauthenticated_req_count++;	
	}
	else {
		ctx.log.debug('Autorized request.');
		
		ctx.state.info = sess.info;
		ctx.state.isAuthenticated = true;
		sess.stats.authenticated_req_count++;
	}
	ctx.log.debug('sess: ', sess);
	ctx.log.debug('ctx.state: ', ctx.state);
	await next();
}




exports.GeneralSessionHandler = GeneralSessionHandler;
exports.AuthSessionHanlder = AuthSessionHanlder;

