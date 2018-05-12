// Pull in required dependencies
var path = require('path');
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		var userInput = req.body;

		var scores = userInput.scores;

		var name = '';
		var pic = '';
		var difference = 10000; 

		for (var i = 0; i < friends.length; i++) {

			var diff = 0;
			for (var j = 0; j < scores.length; j++) {
				diff += Math.abs(friends[i].scores[j] - scores[j]);
			}

			if (diff < difference) {
				difference = diff;
				name = friends[i].name;
				pic = friends[i].photo;
			}
		}

		friends.push(userInput);

		res.json({status: 'OK', name: name, pic: pic});
	});
};
