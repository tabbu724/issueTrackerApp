const aws = require('aws-sdk')
    , config = require('../../config/appConfig')

let fileUploader = (req, res, next) => {
    let s3Bucket = new aws.S3({
        accessKeyId: config.configuration.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.configuration.AWS_SECRET_ACCESS_KEY,
        region: config.configuration.AWS_REGION
    })

    let uploadedDataArray = []

    let uploadFiles = (paramsObject) => {
        return new Promise((resolve, reject) => {
            s3Bucket.upload(paramsObject, (err, data) => {
                if (err) {

                    reject(err)
                }
                else {

                    resolve(data.Location)

                }
            })
        })
    }

    if (req.files != undefined) {
        let fileArray = req.files
        for (file of fileArray) {

            let fileParams = {
                Bucket: config.configuration.AWS_BUCKET_NAME + config.configuration.AWS_FOLDER_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            }
            uploadedDataArray.push(uploadFiles(fileParams))
        }



        Promise.all(uploadedDataArray).then((fileUrls) => {

            req.attachments = fileUrls

            next()
        })
            .catch((err) => {
                next();
            })
    }
    else {
        req.attachments = null
        next()
    }

}


module.exports = {
    fileUploader: fileUploader
}