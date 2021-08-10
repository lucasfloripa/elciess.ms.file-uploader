import { RegisterFileRepository, LoadFileRepository } from '@/data/protocols'
import { AwsHelper } from '@/infra/helpers'

export class FileDynamoRepository implements RegisterFileRepository, LoadFileRepository {
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

  async loadRegister (params: LoadFileRepository.Params): Promise<string> {
    const { bucket, id } = params
    const dynamoDb = AwsHelper.getClientDynamo()
    const exists = dynamoDb.get({
      TableName: bucket,
      Key: {
        id
      },
      ProjectionExpression: 'originalname'
    })
    const response = await exists.promise().then((data) => data.Item?.originalname)
    return response
  }
}
