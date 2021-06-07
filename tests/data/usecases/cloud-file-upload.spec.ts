import { CloudFileUpload } from '@/data/usecases'
import { UploadFileStorage } from '@/data/protocols'
import { UploadFile } from '@/domain/usecases'

const mockRequest = (): UploadFile.Params => ({
  fieldname: 'fieldname',
  originalname: 'originalname',
  encoding: 'encoding',
  mimetype: 'mimetype',
  destination: 'destination',
  filename: 'filename',
  path: 'path',
  size: 1
})

const mockUploadFileStorageStub = (): UploadFileStorage => {
  class UploadFileStorageStub implements UploadFileStorage {
    async uploadFile (uploadFileParams: UploadFile.Params): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new UploadFileStorageStub()
}

type SutTypes = {
  sut: CloudFileUpload
  uploadFileStorageStub: UploadFileStorage
}

const makeSut = (): SutTypes => {
  const uploadFileStorageStub = mockUploadFileStorageStub()
  const sut = new CloudFileUpload(uploadFileStorageStub)
  return { sut, uploadFileStorageStub }
}

describe('CloudFileUpload Data Usecase', () => {
  test('Should call uploadFileCloud with correct values', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    const uploadFileSpy = jest.spyOn(uploadFileStorageStub, 'uploadFile')
    const request = mockRequest()
    await sut.upload(request)
    expect(uploadFileSpy).toHaveBeenCalledWith(request)
  })

  test('Should return null if uploadFileCloud returns null', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    jest.spyOn(uploadFileStorageStub, 'uploadFile').mockReturnValueOnce(Promise.resolve(null))
    const isValid = await sut.upload(mockRequest())
    expect(isValid).toBeNull()
  })
})
