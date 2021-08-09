import { CloudFileUpload } from '@/data/usecases'
import { S3FileStorage } from '@/infra/cloud/s3'
import { UuidAdapter } from '@/infra/generators'
import { FileDynamoRepository } from '@/infra/db/dynamodb'

export const makeCloudFileUpload = (): CloudFileUpload => {
  const s3FileStorage = new S3FileStorage()
  const uuidAdapter = new UuidAdapter()
  const fileDynamoRepository = new FileDynamoRepository()
  return new CloudFileUpload(s3FileStorage, uuidAdapter, fileDynamoRepository)
}
