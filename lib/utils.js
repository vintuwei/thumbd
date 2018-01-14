var AWS = require('aws-sdk')
var client = null
var config = require('./config').Config
var fs = require('fs')

exports.s3Put = function(_bucket, _region, source, destination, headers) {
  var bucket = _bucket || config.get('s3Bucket')
  var region = _region || config.get('awsRegion')

  return new Promise(function(resolve, reject) {

    fs.readFile(source, function (err, data) {
      
      if (err) { throw err; }
    
      var base64data = new Buffer(data, 'binary');
  
      AWS.config.update({ accessKeyId: config.get('awsKey'), secretAccessKey: config.get('awsSecret') });
      AWS.config.region = region;
  
      var s3Client = new AWS.S3();
    
      s3Client.putObject({
        Bucket: bucket,
        Key: destination,
        Body: base64data,
        ACL: headers['x-amz-acl']
      }, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
}

