const logger = require('../middlewares/logger');
const utils = require('../lib/utils');
const error = require('../middlewares/error_handler');


const log = logger.log;

// Handler/Controller to handle route POST requests to Bot 
async function BotGetHandler(ctx, next) {
    ctx.log.debug('Inside Bot Gett Handler'); 

    let sess = ctx.session;
    let errorhandler = false;

  	utils.debug_log_req(ctx, sess);

	// Redirect to login page
	ctx.log.info('Showing Bot Page');
	
	let body = {
		status: 200,
	 	success: true,
	 	next: '/api/v1/bot/query',
	 	next_method: 'POST',
	 	message: 'Welcome to Birdie, your ithaka bot'
    };

    body = JSON.stringify(body);

	ctx.status = 200;
    ctx.body = body;	

  	if (!errorhandler) {
  		// if !errorhanlder, the make status as false else let the status remaid true, so that errorhandler middleware is triggered
	  	error.cancel_error_middleware(ctx);
	}

  	await next();
}




// Handler/Controller to handle route POST requests to Bot 
async function BotQueryHandler(ctx, next) {
    ctx.log.debug('Inside Bot Query Handler'); 

    let sess = ctx.session;
    let errorhandler = false;

  	utils.debug_log_req(ctx, sess);

	ctx.log.info('Showing Bot Query Page');

	let body = {
		status: 200,
	 	success: true,
	 	next: '/api/v1/bot/query',
	 	next_method: 'POST',
	 	message: 'You Said, ' + ctx.request.body.q
    };

    body = JSON.stringify(body);

	ctx.status = 200;
    ctx.body = body;	
  	

  	if (!errorhandler) {
  		// if !errorhanlder, the make status as false else let the status remaid true, so that errorhandler middleware is triggered
	  	error.cancel_error_middleware(ctx);
	}

  	await next();
}






exports.BotGetHandler = BotGetHandler;
exports.BotQueryHandler = BotQueryHandler;



