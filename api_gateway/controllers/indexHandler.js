const logger = require('../middlewares/logger');
const utils = require('../lib/utils');
const error = require('../middlewares/error_handler');


const log = logger.log;

// Handler/Controller to handle route POST requests to Index 
async function IndexGetHandler(ctx, next) {
    ctx.log.debug('Inside Index Gett Handler'); 

    let sess = ctx.session;
    let errorhandler = false;

  	utils.debug_log_req(ctx, sess);

  	if (!ctx.state.isAuthenticated){
  		// Redirect to login page
  		ctx.log.info('Showing UnAuthorized Index Page');
  		
  		// delete session since session to be there/persist for authenticated users
	  	// ctx.session = null;
  		sess.info = null;

  		let body = {
	    	status: 200,
	     	success: true,
	     	next: '/api/v1/bot/start',
	     	next_method: 'GET',
	     	message: 'Welcome to Ithaka'
	    };

	    body = JSON.stringify(body);

		ctx.status = 200;
	    ctx.body = body;	
  	}
  	else {
  		
  		let userid = sess.info.userid;
	    try {
	    	ctx.log.info('Authorized, redirecting to wizards');
	    	ctx.redirect('/api/v1/allocator/'+userid);

	    }
	   	catch(err) {
		    ctx.log.error('Allocator Service Redirect Error : ', err.message);
			errorhandler = true;
		}
			
  	}

  	if (!errorhandler) {
  		// if !errorhanlder, the make status as false else let the status remaid true, so that errorhandler middleware is triggered
	  	error.cancel_error_middleware(ctx);
	}

  	await next();
}








exports.IndexGetHandler = IndexGetHandler;



