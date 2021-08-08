import { CloudFileUpload } from '@/data/usecases'
import { S3FileStorage } from '@/infra/cloud/s3'
import { UuidAdapter } from '@/infra/generators'

export const makeCloudFileUpload = (): CloudFileUpload => {
  const s3FileStorage = new S3FileStorage()
  const uuidAdapter = new UuidAdapter()
  return new CloudFileUpload(s3FileStorage, uuidAdapter)
}
