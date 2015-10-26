var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

//username: guest
//password: guest
//For the consideration of security, we make the "guest" account read-only.
// If you want to get write permission, please contact me via jingxiao1216@gmail.com
var url = 'mongodb://guest:guest@ds043200.mongolab.com:43200/twit';

var Twit = require('twit');
var T = new Twit({
	consumer_key: "mxm749NomiBIZViowOuXMzwM7",
	consumer_secret: "Pj65ozDpzi5SETW1IDEDJcFoWSYp5yWiGMPyUjLctGfMlmeyfW",
	access_token: "3923310994-J3YpCqPFg7kAequBOd1LLTQ4JGhYeKeFzgb471D",
	access_token_secret: "OoEWEVe0Cyozs3eMiqKxDK1u54otVcvEjLb040htdEQ54"
});

var keywordString = 'music,food,sports,travel';
var keywordList = keywordString.split(',');
var filter = {'track': 'music,food,sports,travel'};
var stream = T.stream('statuses/filter', filter);

MongoClient.connect(url, function (err, db) {
	stream.on('tweet', function (tweet) {
		if (tweet.coordinates) {
			var keyList = [];
			for (var i in keywordList) {
				if (tweet.text.indexOf(keywordList[i]) > -1) {
					keyList.push(keywordList[i]);
				}
			}
			if (keyList.length > 0) {
				var obj = [];
				for (var i in keyList) {
					obj[i] = {
						'tweet_id': tweet.id,
						'user_id': tweet.user.id,
						'time': tweet.user.created_at,
						'text': tweet.text,
						'lat': tweet.coordinates.coordinates[1],
						'lng': tweet.coordinates.coordinates[0],
						'keyword': keyList[i]
					};
				}
				db.collection('twitters').insertMany(obj, function (err, result) {
					assert.equal(err, null);
				});
			}
		}

	});

});

