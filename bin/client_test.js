#!/usr/bin/env node

var 
	Client = require('../lib/client').Client,
	client = new Client({
		awsKey: 'AKIAJ655HLUMOQH6DGHQ',
		awsSecret: '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',
		awsRegion: 'eu-west-1',
		sqsQueue: '469241275693/project-cars-queue',
		s3Bucket: 'project-cars-image-bucket'
	});

var destination = '/example/awesome.jpg';

client.upload('../test_image.jpg', destination, function(err) {
	if (err) throw err;
	client.thumbnail(destination, [{suffix: 'small', width: 100, height: 100, background: 'red', strategy: 'matted'}], {
		// notify: 'https://callback.example.com', // optional web-hook when processing is done.
		prefix: 'cars_' // optional prefix for thumbnails created.
	});
});