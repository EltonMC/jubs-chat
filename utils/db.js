/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/
 
"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb').MongoClient;;
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
		this.mongoURL = `mongodb://127.0.0.1:27017/local`;
	}

	onConnect(callback){
		this.mongoClient.connect("mongodb://jubsdb:FNZiTeUC34GTjZ7mQ4MbZ3XGUg60PYo86OjArey0K1SVbDNR7sYwGv06OYZZpsswH5amflSpvRk2VPkAVLf0gw==@jubsdb.documents.azure.com:10255/?ssl=true", function (err, db) {
			assert.equal(null, err);
			callback(db,this.ObjectID);
		});
	}
}
module.exports = new Db();