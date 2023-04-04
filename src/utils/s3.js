require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const bcrypt = require('bcryptjs');

const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg/jpg/png/pdf' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

var upload = multer({ storage: storage});

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    Bucket: bucketName
});

const uploadFile = async(file, callback) => {
    // const fileStream = fs.createReadStream(file.path);
    // console.log("this is the line",file.buffer)
    const fileName = bcrypt.hashSync(file.originalname, 13) + path.extname(file.originalname);
    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: fileName
    };
    await s3.upload(uploadParams).promise();
    return fileName;
};


const deleteFile = async(fileName) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName
    };
    await s3.deleteObject(deleteParams).promise();
}

module.exports = { 
    uploadFile, 
    upload 
};