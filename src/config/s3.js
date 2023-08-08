import aws from 'aws-sdk';

const s3 = new aws.S3({
    accessKeyId: "AKIAQYPII4ZUKU52R26Y",
    secretAccessKey: "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"
});

export default s3;