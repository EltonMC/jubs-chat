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
	}

	onConnect(callback){
		mongoClient.connect("mongodb://mongojubs:ZrOeAeyb6mds1zymz6PVDmz4u0QIiSa2ITpsoxtcoQeMWOP0BovQHohoZhd69PRuhevtHZ29rxzIcGQGRPIAFQ==@mongojubs.documents.azure.com:10255/?ssl=true", function (err, db) {
			assert.equal(null, err);
			callback(db,this.ObjectID);
		});
	}
}
module.exports = new Db();