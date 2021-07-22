// import { AwsHelper as sut } from '@/infra/cloud'

const mS3Instance = {
  upload: jest.fn().mockReturnThis(),
  promise: jest.fn()
}

jest.mock('aws-sdk', () => {
  return { S3: jest.fn(() => mS3Instance) }
})

describe('61830632', () => {
  test('', () => {
    expect(true).toBeTruthy()
  })
})
