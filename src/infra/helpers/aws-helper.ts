import aws from 'aws-sdk'

export const AwsHelper = {
  clientS3: null as aws.S3,
  clientDynamo: null as aws.DynamoDB.DocumentClient,

  getClientS3 (): aws.S3 {
    if (!this.clientS3) {
      this.clientS3 = new aws.S3()
    }
    return this.clientS3
  },

  getClientDynamo (): aws.DynamoDB.DocumentClient {
    if (!this.clientDynamo) {
      this.clientDynamo = new aws.DynamoDB.DocumentClient({
        region: 'us-east-1'
      })
    }
    return this.clientDynamo
  }
}
