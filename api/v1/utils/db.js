"use strict";
/*requiring mongodb node modules */
const assert = require('assert');

class Db{

	constructor(){}

	onConnect(callback){
		var mongoDb = require("mongodb")
		var mongoClient = mongoDb.MongoClient;
		mongoClient.connect("mongodb://mongojubs:ZrOeAeyb6mds1zymz6PVDmz4u0QIiSa2ITpsoxtcoQeMWOP0BovQHohoZhd69PRuhevtHZ29rxzIcGQGRPIAFQ==@mongojubs.documents.azure.com:10255/?ssl=true", function (err, db) {
			assert.equal(null, err);
			callback(db, mongoDb.ObjectID);
		});
	}

	
}
module.exports = new Db();