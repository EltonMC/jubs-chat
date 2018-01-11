
'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketEvents = require('./utils/socket'); 
const routes = require('./utils/routes'); 


class Server{

    constructor(){
        this.port =  process.env.PORT || 1337;
        this.host = `chat-jubs.azurewebsites.net`;
        
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){        
        this.app.use(
            //bodyParser.json()
        );
        this.app.use(
        	cors()
        );
    }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.port, this.port, () => {
            console.log(`Listening on 1337`);
        });

    }

}

const app = new Server();
app.appExecute();
