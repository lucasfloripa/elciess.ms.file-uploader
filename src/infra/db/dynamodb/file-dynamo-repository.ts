import { RegisterFileRepository } from '@/data/protocols'
import { AwsHelper } from '@/infra/helpers'

export class FileDynamoRepository implements RegisterFileRepository {
  async register (params: RegisterFileRepository.Params): Promise<boolean> {
    const { bucket, id, mimetype, originalname } = params
    const dynamoDb = AwsHelper.getClientDynamo()
    const response = await dynamoDb.put({
      TableName: bucket,
      Item: {
        id,
        originalname,
        mimetype
      }
    }).promise().then(data => data.$response.httpResponse.statusCode)
    // eslint-disable-next-line no-unneeded-ternary
    return response === 200 ? true : false
  }
}
