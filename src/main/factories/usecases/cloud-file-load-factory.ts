import { CloudFileLoad } from '@/data/usecases'
import { S3FileStorage } from '@/infra/cloud/s3'
import { FileDynamoRepository } from '@/infra/db/dynamodb'

export const makeCloudFileLoad = (): CloudFileLoad => {
  const fileDynamoRepository = new FileDynamoRepository()
  const s3FileStorage = new S3FileStorage()
  return new CloudFileLoad(s3FileStorage, fileDynamoRepository)
}
