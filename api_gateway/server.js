#!/usr/bin/env node 

const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .example('$0 -p 5001', 'start api gateway app at port number 9091')
    .alias('p', 'port')
    .default('p', 5001)
    .nargs('p', 1)
    .describe('p', 'Port number to listen at')
    //.demand(1, ['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('Anirban Roy Das, Ithaka Hack, Api Gateway, Copyright 2017')
    .argv;
const http = require('http');
const koa = require('koa');
const app = new koa();



// const utils = require('./lib/utils');
const CONFIG = require('./lib/settings').CONFIG_DATA;
const logger = require('./middlewares/logger');
const sessions = require('./middlewares/sessions');
const error = require('./middlewares/error_handler');
const body_parser = require('./middlewares/body_parser');

const auth_API = require('./routes/authRoute');
const index_API = require('./routes/indexRoute');
const bot_API = require('./routes/botRoute');
const allocator_API = require('./routes/allocatorRoute');



const log = logger.log;


// Add Logger Middleware
app.use(logger.logger_Middleware);

// Add additional custom koa bunyan logger middlewares
// app.use(logger.koaBunyan_requestLogger_Middleware);
app.use(logger.koaBunyan_requestIdContext_Middleware);
app.use(logger.koaBunyan_timeContext_Middleware);



// Add Session Middleware 
// create the secre keys
// app.keys = ['t8Hh0jztaePsju280lRobJRZapBszUR4McFGoe9MeGff', 'wM5vPFfEPu5Sfua9qiTlGD4XbhLQJMdWnfIQxrGk8O4e'];
app.keys = CONFIG.api_gateway.keys;

// use the session middleware
app.use(sessions.session_Middleware);

// Add body parser middleware
app.use(body_parser.bodyparser_Middleware);

// Use the routes 
app.use(auth_API.routes());
app.use(auth_API.allowedMethods());
app.use(index_API.routes());
app.use(index_API.allowedMethods());
app.use(bot_API.routes());
app.use(bot_API.allowedMethods()); 
app.use(allocator_API.routes());
app.use(allocator_API.allowedMethods());  

// Add Error Handler route
app.use(error.middleware);


// Add Socket.IO / Websocket Server
const server = http.createServer(app.callback());

// start server / start listening
server.listen(argv.port, () =>{
    log.info(`App started at at port ${argv.port}`);
});

