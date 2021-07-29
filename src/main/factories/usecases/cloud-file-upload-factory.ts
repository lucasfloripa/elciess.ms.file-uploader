import { CloudFileUpload } from '@/data/usecases'
import { AwsStorage } from '@/infra/cloud'

export const makeCloudFileUpload = (): CloudFileUpload => {
  const awsStorage = new AwsStorage()
  return new CloudFileUpload(awsStorage)
}
