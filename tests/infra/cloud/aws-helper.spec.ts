import { AwsHelper } from '@/infra/cloud'

describe('AwsHelper', () => {
  test('Should return a S3 client', () => {
    const clientS3 = AwsHelper.getClientS3()
    expect(clientS3).not.toBeNull()
  })
})
