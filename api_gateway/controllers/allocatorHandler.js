const axios = require('axios');

const logger = require('../middlewares/logger');
const utils = require('../lib/utils');
// const cache = require('../middlewares/cache_handler');
// const validator = require('../middlewares/validate_data_helpers');
const error = require('../middlewares/error_handler');


const log = logger.log;
ALLOCACATOR_SERVICE_API = 'http://allocator:6001/api/v1/allocator/';

// Handler/Controller to handle route POST requests to Allocator Service
async function AllocatorPostHandler(ctx, next) {
    ctx.log.debug('Inside Allocator Post Handler'); 

    let sess = ctx.session;
    let errorhandler = false;

  	utils.debug_log_req(ctx, sess);

  	ctx.log.debug('ctx.query.dummy : ', ctx.query.dummy);

  	if (!ctx.state.isAuthenticated && !ctx.query.dummy){
  		// Redirect to login page
  		ctx.log.info('Redirecting to login page');
  		
  		// delete session since session to be there/persist for authenticated users
	  	// ctx.session = null;
  		sess.info = null;

  		let body = {
	    	status: 401,
	     	success: false,
	     	next: '/login',
	     	next_method: 'GET',
	     	message: 'Go to Login Page'
	    };

	    body = JSON.stringify(body);

		ctx.status = 200;
	    ctx.body = body;	

  	}
  	else {
  		ctx.log.debug('Initating Request to Allocator Service')
	    try {
	    	let response = await axios.post(ALLOCACATOR_SERVICE_API + ctx.params.userid, {}, {timeout: 1000});
	    	let body = {
		    	status: response.status,
		     	success: true,
		     	message: response.data
		    };

		    body = JSON.stringify(body);

			ctx.status = 200;
		    ctx.body = body;

	    }
	   	catch(err) {
	   		let err_code = 503;
		    if (err.response) {
			    // The request was made and the server responded with a status code
			    // that falls out of the range of 2xx
			    ctx.log.error('Allocator Service Error : ', err.response.data);
			    ctx.log.error('Allocator Service Error Status: ', err.response.status);
			    err_code = err.response.status;
			} 
			else if (err.request) {
			    // The request was made but no response was received
			    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			    // http.ClientRequest in node.js
			    ctx.log.error('Allocator Service Error : ', err.request);
			} 
			else {
			    // Something happened in setting up the request that triggered an Error
			    ctx.log.error('Allocator Service Error : ', err.message);
			}
			errorhandler = true;
			

			error.activate_error_middleware(ctx, err_code, 'Service Unavailble');
		}
			
  	}

  	if (!errorhandler) {
  		// if !errorhanlder, the make status as false else let the status remaid true, so that errorhandler middleware is triggered
	  	error.cancel_error_middleware(ctx);
	}

  	await next();
}









exports.AllocatorPostHandler = AllocatorPostHandler;



