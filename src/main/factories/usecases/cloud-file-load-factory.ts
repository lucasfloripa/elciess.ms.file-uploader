import { CloudFileLoad } from '@/data/usecases'
import { S3FileStorage } from '@/infra/cloud/s3'

export const makeCloudFileLoad = (): CloudFileLoad => {
  const s3FileStorage = new S3FileStorage()
  return new CloudFileLoad(s3FileStorage)
}
