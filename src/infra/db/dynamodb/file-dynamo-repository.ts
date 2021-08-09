import { RegisterFileRepository } from '@/data/protocols'
import { AwsHelper } from '@/infra/helpers'

export class FileDynamoRepository implements RegisterFileRepository {
  async register (params: RegisterFileRepository.Params): Promise<void> {
    const { bucket, id, mimetype, originalname } = params
    const dynamoDb = AwsHelper.getClientDynamo()
    await dynamoDb.put({
      TableName: bucket,
      Item: {
        id,
        originalname,
        mimetype
      }
    }).promise()
  }
}
