"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
		this.mongoURL = `mongodb://mongojubs:ZrOeAeyb6mds1zymz6PVDmz4u0QIiSa2ITpsoxtcoQeMWOP0BovQHohoZhd69PRuhevtHZ29rxzIcGQGRPIAFQ==@mongojubs.documents.azure.com:10255/?ssl=true`;
	}

	onConnect(callback){
		// this.mongoClient.connect(this.mongoURL, (err, db) => {
		// 	assert.equal(null, err);
		// 	callback(db,this.ObjectID);
		// });
	}
}
module.exports = new Db();