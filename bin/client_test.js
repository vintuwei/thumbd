#!/usr/bin/env node

var 
	Client = require('../lib/client').Client,
	config = require('../lib/config').Config,
	client = new Client({
		awsKey: config.get('awsKey'),
		awsSecret: config.get('awsSecret'),
		awsRegion: config.get('awsRegion'),
		sqsQueue: config.get('sqsQueue'),
		s3Bucket: config.get('s3Bucket')
	});

var destination = 'test_pic.jpg';

client.upload('./test_image.jpg', destination, function(err) {

	if (err) throw err;
	client.thumbnail(destination, [
		{
			suffix: 'small', 
			width: 100, 
			height: 100,
			background: 'red', 
			strategy: 'matted'
		},
		{
			suffix: 'medium', 
			width: 200, 
			height: 200,
			background: 'red', 
			strategy: 'matted'
		},
		{
			suffix: 'large', 
			width: 300, 
			height: 300,
			background: 'red', 
			strategy: 'matted'
		}
	], {
		// notify: 'https://callback.example.com', // optional web-hook when processing is done.
		prefix: 'test_pic' // optional prefix for thumbnails created.
	});
});
