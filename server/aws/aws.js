const AWS = require('aws-sdk'),
      ENV = process.env,
      BUCKET_NAME = ENV.BUCKET_NAME,
      IAM_USER_KEY = ENV.IAM_USER_KEY,
      IAM_USER_SECRET = ENV.IAM_USER_SECRET;

exports.sendPics = (pic, cb) => {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  let imageBody2=pic.imageBody.replace(/^data:image\/[^;]*;base64,/, ""),
      buf = new Buffer(imageBody2, 'base64'),
      params = {
        Bucket: BUCKET_NAME,
        Key: pic.imageName,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: pic.imageExtension,
        ACL: 'public-read'
      };
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log('error in callback');
      console.log(err);
    }
    console.log('success');
    console.log(data);
    cb(data);
  });
}