
'use strict';

const helper = require('./helper');
const mongoDb = require("./db");

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.post('/users', (request, response) => {
			const data = {
				idUser: request.body.idUser.toString(),
				first_name: request.body.first_name.toString(),
				last_name: request.body.last_name.toString(),
				idOnesignal: request.body.idOnesignal,
				status: 'N'
			}

			let registrationResponse = {}

			if (data.idUser == '' || data.idUser == null){
	            registrationResponse.error = true;
	            registrationResponse.message = `id cant be empty.`;
	            response.status(412).json(registrationResponse);
			}else {
				helper.userCheck({idUser: data.idUser}, (count) =>{
					let result = {};
					if (count > 0) {
						registrationResponse.error = true;
						registrationResponse.message = `id in use`;
						response.status(200).json(registrationResponse);
					} else {
						helper.registerUser( data, (error,result)=>{
							if (error) {
								registrationResponse.error = true;
								registrationResponse.message = `Server error.`;
								response.status(404).json(registrationResponse);
							}else{
								registrationResponse.error = false;
								registrationResponse.message = `User registration successful.`;
								response.status(200).json(registrationResponse);
							}
						});					
					}
				});
			}
		});

		this.app.get('/users/:id',(request, response) => {

			let idUser = request.params.id.toString();
			let user = {}
		
			if (idUser == '') {
				user.error = true;
	            user.user = `id cant be empty.`;
	            response.status(200).json(chats);
			}else{
				helper.getUser(idUser, (error, result)=>{
          			if (error) {
	           			user.error = true;
	            		user.user = `Server error.`;
	           			response.status(200).json(user);
	           		}else{
					    user.error = false;											  
	            		user.user = result;
	           			response.status(200).json(user);
	           		}
				});
	    	}
		})

		this.app.put('/users/:id',(request, response) => {

			let idUser = request.params.id.toString();
			let idOnesignal = request.body.idOnesignal;
			let user = {}
		
			if (idUser == '') {
				user.error = true;
	            user.user = `id cant be empty.`;
	            response.status(200).json(user);
			}else{
				helper.userCheck({idUser: idUser}, (count) =>{
					let result = {};
					if (count <= 0) {
						result.error = true;
						result.message = `user not registered`;
						response.status(200).json(result);
					} else {
						helper.update({idUser: idUser, idOnesignal: idOnesignal}, (error, result)=>{
							if (error) {
								result.error = true;
								result.user = `Server error.`;
								response.status(200).json(result);
							}else{
								result.error = false;											  
								result.user = result;
								response.status(200).json(result);
							}
						});
					}
				})
			}
		})

		this.app.post('/chats',(request,response) =>{

			const data = {
				idService: request.body.idService.toString(),
				title: request.body.title.toString(),
				new_message: "",
				status: 'open'
			};

			let registrationResponse = {}
			
			data.timestamp = Math.floor(new Date() / 1000);
			
			helper.getUser(request.body.idClient.toString(), (error, result) => {
				if (error) {
					data.error = true;
				 	data.user = `Server error.`;
					response.status(200).json(data);
				}else{
					data.error = false;											  
					data.client = result[0];
				}
			});

			helper.getUser(request.body.idPro.toString(), (error, result) => {
				if (error) {
					user.error = true;
				 	user.user = `Server error.`;
					response.status(200).json(user);
				}else{
					data.error = false;											  
					data.pro = result[0];
				}
			});

			helper.chatCheck({idService: data.idService, idPro: request.body.idPro.toString() }, (err, result) =>{
				if (result) {
					registrationResponse.error = true;
					registrationResponse.chat = result;
					response.status(200).json(registrationResponse);
				} else {
					 helper.saveChat( data, (error, result)=>{
						if (error) {
							registrationResponse.error = true;
							registrationResponse.message = `Server error.`;
							response.status(404).json(registrationResponse);
						}else{
							registrationResponse.error = false;
							registrationResponse.chat = data;
							response.status(200).json(registrationResponse);
						}
					});
				}
			});
		});

		this.app.get('/messages/:id',(request,response) =>{

			let idChat = request.params.id.toString();
			let messages = {}

			if (idChat == '') {
				messages.error = true;
	            messages.message = `idChat cant be empty.`;
	            response.status(200).json(messages);
			}else{
	           	helper.getMessages(idChat , (error,result)=>{
          			if (error) {
	           			messages.error = true;
	            		messages.message = `Server error.`;
	           			response.status(200).json(messages);
	           		}else{
						messages.error = false;								  
						messages.messages = result;
	           			response.status(200).json(messages);
	           		}
				});
	        }
		});

		this.app.get('/chats/:id',(request, response) =>{

			let idUser = request.params.id.toString();
			let chats = {}
			
			if (idUser == '') {
				chats.error = true;
	            chats.chat = `id cant be empty.`;
	            response.status(200).json(chats);
			}else{
				helper.getChats(idUser, (error, result)=>{
          			if (error) {
	           			chats.error = true;
	            		chats.chat = `Server error.`;
	           			response.status(200).json(chats);
	           		}else{
					    chats.error = false;											  
	            		chats.chat = result;
	           			response.status(200).json(chats);
	           		}
				});
	    	}
		});
		
		this.app.put('/chats/:id',(request, response) =>{

			let id = request.params.id.toString();
			let chats = {};
			
			if (id == '') {
				chats.error = true;
	            chats.chat = `id cant be empty.`;
	            response.status(200).json(chats);
			}else{
				helper.closeChat(id, (error, result)=>{
          			if (error) {
	           			chats.error = true;
	            		chats.chat = `Server error.`;
	           			response.status(200).json(chats);
	           		}else{
					    chats.error = false;											  
	            		chats.chat = result;
	           			response.status(200).json(chats);
	           		}
				});
	    	}
		});
		
		this.app.get('/', function (request, response) {
			response.send("Server ON!");
		});

	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;