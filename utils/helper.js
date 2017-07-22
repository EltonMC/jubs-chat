'use strict';
 
class Helper{
 
	constructor(){
 		this.Mongodb = require("./db");
	}
 
	/*
	* Name of the Method : userCheck
	* Description : To check if id is available or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/

	userCheck(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').find(data).count( (err, result) => {
				db.close();
				callback(result);
			});
		});
	}
	

	/*
	* Name of the Method : chatCheck
	* Description : To check if chat is available or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/

	chatCheck(data, callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').findOne(data, (err, result) => {
				db.close();
				callback(err, result);
			});
		});
	}
 
	/*
	* Name of the Method : saveChat
	* Description : save the chat
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/

	saveChat(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').insertOne(data, (err, result) =>{
				db.close();
				callback(err,result);
			});
		});
	}
 
	/*
	* Name of the Method : registerUser
	* Description : register the User
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/

	registerUser(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').insertOne(data, (err, result) =>{
				db.close();
				callback(err,result);
			});
		});
	}
 
	/*
	* Name of the Method : getUserInfo
	* Description : to get information of single user.
	* Parameter : 
	*		1) userId of the user
	*		2) callback function
	* Return : callback 
	*/

	getUserInfo(userId,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').findOne( { _id : ObjectID(userId)}, (err, result) => {
				db.close();
				callback(err,result);
			});
		});
	}
 
	/*
	* Name of the Method : addSocketId
	* Description : Updates the socket id of single user.
	* Parameter : 
	*		1) userId of the user
	*		2) callback function
	* Return : callback 
	*/
	addSocketId(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').update( { idUser : data.id}, data.value ,(err, result) => {
				db.close();
				callback(err,result.result);
			});
		});
	}
	
	/*
	* Name of the Method : insertMessages
	* Description : To insert a new message into DB.
	* Parameter : 
	*		1) data comprises of message,fromId,toId
	*		2) callback function
	* Return : callback 
	*/
	
	insertMessages(data,callback){

		const newMessage = {
  			$set :{
				new_message: data.message,
				timestamp : data.timestamp
  			}
		};


		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('messages').insertOne(data, (err, result) =>{
				db.collection('chats').update({_id: ObjectID(data.idChat)}, newMessage ,(err, result) => {
					db.close();
					callback(err, result);
				});
			})
		});
	}

	/*
	* Name of the Method : getChats
	* Description : To fetch messages from DB between two users.
	* Parameter : 
	*		1) userId, toUserId
	*		2) callback function
	* Return : callback 
	*/

	getChats(userId, callback){
 		const data = {
  			'status': 'open',
	        '$or' : [
	        	{ 
					'idClient': userId
	        	},{
					'idPro': userId
	        	},
	        ]
	    };
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').find(data).sort({'timestamp':-1}).toArray( (err, result) => {
			db.close();
				callback(err,result);
			});
		});
	}

	/*
	* Name of the Method : getMessages
	* Description : To fetch messages from DB between two users.
	* Parameter : 
	*		1) userId, toUserId
	*		2) callback function
	* Return : callback 
	*/
	getMessages(idChat, callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('messages').find({idChat: idChat}).sort({'timestamp':1}).toArray( (err, result) => {
			db.close();
				callback(err,result);
			});
		});
	}
 
	/*
	* Name of the Method : getUser
	* Description : To fetch messages from DB between two users.
	* Parameter : 
	*		1) userId, toUserId
	*		2) callback function
	* Return : callback 
	*/
	getUser(idUser, callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').find({idUser: idUser}).toArray( (err, result) => {
			db.close();
				callback(err,result);
			});
		});
	}

	/*
	* Name of the Method : getUser
	* Description : To fetch messages from DB between two users.
	* Parameter : 
	*		1) userId, toUserId
	*		2) callback function
	* Return : callback 
	*/
	getUserSocket(idUser, callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').find({idUser: idUser}).limit(1).toArray((err, result) => {
			db.close();
				callback(err,result);
			});
		});
	}
	
	/*
	* Name of the Method : addSocketId
	* Description : Updates the socket id of single user.
	* Parameter : 
	*		1) userId of the user
	*		2) callback function
	* Return : callback 
	*/

	closeChat(data,callback){
		let value = {
			$set :{
				status : 'close'
			}
		};          			
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').update( { idService : data }, value ,(err, result) => {
				db.close();
				callback(err,result);
			});
		});
	}

	/*
	* Name of the Method : logout
	* Description : To logout the loggedin user.
	* Parameter : 
	*		1) userID
	*		2) callback function
	* Return : callback 
	*/

	logout(idUser,callback){
		
		const data = {
  			$set :{
  				status : 'N'
  			}
		  };
		
		this.Mongodb.onConnect((db,ObjectID) => {
			
			let condition = {
				idUser : idUser
			}
  
			db.collection('users').update( condition, data ,(err, result) => {
				db.close();
				callback(err, result.result);
			});
		});
	}
}
 
module.exports = new Helper();