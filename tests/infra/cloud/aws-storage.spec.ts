import { UploadFileStorage } from '@/data/protocols'
import { AwsStorage } from '@/infra/cloud'

const makeRequest = (): UploadFileStorage.Params => ({
  originalname: 'any_originalname',
  mimetype: 'image/png',
  path: `${__dirname}/../mocks/gabriel.png`
})

const makeSut = (): AwsStorage => {
  const sut = new AwsStorage()
  return sut
}

describe('AwsStorage', () => {
  describe('uploadFile()', () => {
    test('Should return true if upload file to S3 storage succeds', async () => {
      const sut = makeSut()
      const request = makeRequest()
      const isValid = await sut.uploadFile(request)
      expect(isValid).toBeTruthy()
    })
  })
})
