import aws from 'aws-sdk'

export const AwsHelper = {
  clientS3: null as aws.S3,

  getClientS3 (): aws.S3 {
    if (!this.clientS3) {
      this.clientS3 = new aws.S3()
    }
    return this.clientS3
  }
}
