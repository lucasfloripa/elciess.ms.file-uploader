import { CloudFileLoad } from '@/data/usecases'
import { AwsStorage } from '@/infra/cloud'

export const makeCloudFileLoad = (): CloudFileLoad => {
  const awsStorage = new AwsStorage()
  return new CloudFileLoad(awsStorage)
}
