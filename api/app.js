/**
 * USER
 * Created by samli on 2017/3/2.
 */
var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	console.log(db.collection)
	assert.equal(null, err);
	console.log("Connected correctly to server");
	
	db.close();
});
var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('demodb');
	// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}
var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('demodb');
	// Find some documents
	collection.find({a:1}).toArray(function(err, docs) {
		assert.equal(err, null);
		assert.equal(23, docs.length);
		console.log("Found the following records");
		callback(docs);
	});
}