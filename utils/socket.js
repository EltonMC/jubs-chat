'use strict';

const path = require('path');
const helper = require('./helper');

class Socket{

	constructor(socket){
		this.io = socket;
		this.io.set('origins', '*:*');

	}
	
	socketEvents(){

		this.io.on('connection', (socket) => {
		
			/**
			* send the messages to the user
			*/
			socket.on('add-message', (data) => {

				let toIdSocket;

				if (data.message === '') {
					
					this.io.to(socket.id).emit(`add-message-response`,`Message cant be empty`); 

				}else if(data.fromIdUser === ''){
					
					this.io.to(socket.id).emit(`add-message-response`,`Unexpected error, Login again.`); 

				}else if(data.toIdUser === ''){
					
					this.io.to(socket.id).emit(`add-message-response`,`Select a user to chat.`); 

				}else{

					helper.getUserSocket(data.toIdUser, (error, result) =>{
						toIdSocket = result[0].idSocket;
						data.timestamp = Math.floor(new Date() / 1000);

						helper.insertMessages(data,( error , response)=>{
							this.io.to(toIdSocket).emit(`add-message-response`,data, ack => {
								if(ack !== 'on'){
									helper.insertMessages({
										fromIdUser : "1",
										message : "Quanto custa esse revólver?",
										toIdUser : "40",
										idChat: "5a590816612e3c0ccc181531",
										timestamp : 1515784233,
										on: 'on'}, ( error , response)=>{});
								}else{
									helper.insertMessages({	
										fromIdUser : "1",
										message : "Quanto custa esse revólver?",
										toIdUser : "40",
										idChat: "5a590816612e3c0ccc181531",
										timestamp : 1515784233,
										on: 'off'}, ( error , response)=>{});
								}
							}); 
						});
					});

				}				
		    });


			/**
			* Logout the user
			*/
			socket.on('logout',(data)=>{

				const idUser = data.userId;
				
				helper.logout(idUser , false, (error, result)=>{

					this.io.to(socket.id).emit('logout-response',{
						error : false
					});
				});	
		    });

		});

	}
	
	socketConfig(){

		this.io.use(function(socket, next) {
			let idUser = socket.request._query['idUser'];
          	let userSocketId = socket.id;
          	const data = {
          		id : idUser,
          		value : {
          			$set :{
          				idSocket : userSocketId,
          				status : 'Y'
          			}
          		}
          	}

          	helper.addSocketId( data , (error, response)=>{
          		// socket id updated.
          	});
			next();
			  
        });

        this.socketEvents();
	}
}
module.exports = Socket;