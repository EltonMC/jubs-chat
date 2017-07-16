/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/
 
'use strict';
 
class Helper{
 
	constructor(){
 
		this.Mongodb = require("./db");
	}
 
	/*
	* Name of the Method : userNameCheck
	* Description : To check if username is available or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	// userNameCheck(data,callback){
	// 	this.Mongodb.onConnect( (db,ObjectID) => {
	// 		db.collection('users').find(data).count( (err, result) => {
	// 			db.close();
	// 			callback(result);
	// 		});
	// 	});
	// }

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

	chatCheck(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').find(data).count( (err, result) => {
				db.close();
				callback(result);
			});
		});
	}

	/*
	* Name of the Method : login
	* Description : login the user.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	// login(data,callback){
	// 	this.Mongodb.onConnect( (db,ObjectID) => {
	// 		db.collection('users').findAndModify( data ,[], {$set: {'online': 'Y'}},{},(err, result) => {
	// 			db.close();
	// 			callback(err,result.value);
	// 		});
	// 	});
	// }
 
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
	* Name of the Method : userSessionCheck
	* Description : to check if user is online or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/

	// userSessionCheck(data,callback){
	// 	this.Mongodb.onConnect( (db,ObjectID) => {
	// 		db.collection('users').findOne( { _id : ObjectID(data.userId) , online : 'Y'}, (err, result) => {
	// 			db.close();
	// 			callback(err,result);
	// 		});
	// 	});
	// }
 
 
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
	* Name of the Method : getChatList
	* Description : To get the list of online user.
	* Parameter : 
	*		1) userId (socket id) of the user
	*		2) callback function
	* Return : callback 
	*/

	// getChatList(userId, callback){
	// 	this.Mongodb.onConnect( (db,ObjectID) => {
	// 		db.collection('users').find({socketId : { $ne : userId }}).toArray( (err, result) => {
	// 		db.close();
	// 			callback(err,result);
	// 		});
	// 	});
	// }
 
	/*
	* Name of the Method : insertMessages
	* Description : To insert a new message into DB.
	* Parameter : 
	*		1) data comprises of message,fromId,toId
	*		2) callback function
	* Return : callback 
	*/
	
	insertMessages(data,callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('messages').insertOne(data, (err, result) =>{
				db.close();
				callback(err,result);
			});
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
	        '$or' : [
	        	{ 
					'idClient': userId
	        	},{
					'idPro': userId
	        	},
	        ]
	    };
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('chats').find(data).toArray( (err, result) => {
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
	* Name of the Method : logout
	* Description : To logout the loggedin user.
	* Parameter : 
	*		1) userID
	*		2) callback function
	* Return : callback 
	*/
	logout(userID,isSocketId,callback){
		
		const data = {
  			$set :{
  				online : 'N'
  			}
  		};
		this.Mongodb.onConnect( (db,ObjectID) => {
			
			let condition = {};
			if (isSocketId) {
				condition.socketId = userID;
			}else{
				condition._id = ObjectID(userID);
			}
  
			db.collection('users').update( condition, data ,(err, result) => {
				db.close();
				callback(err,result.result);
			});
		});
	}
}
 
module.exports = new Helper();