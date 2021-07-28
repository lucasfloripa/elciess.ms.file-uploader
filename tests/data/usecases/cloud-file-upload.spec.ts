import { CloudFileUpload } from '@/data/usecases'
import { UploadFileStorage } from '@/data/protocols'
import { UploadFile } from '@/domain/usecases'

const mockRequest = (): UploadFile.Params => ({
  bucket: 'any_bucket',
  originalname: 'originalname',
  mimetype: 'mimetype',
  path: 'path'
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
  test('Should call uploadFileStorage with correct values', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    const uploadFileSpy = jest.spyOn(uploadFileStorageStub, 'uploadFile')
    const request = mockRequest()
    await sut.upload(request)
    expect(uploadFileSpy).toHaveBeenCalledWith(request)
  })
  test('Should return null if uploadFileStorage returns null', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    jest.spyOn(uploadFileStorageStub, 'uploadFile').mockReturnValueOnce(Promise.resolve(null))
    const isValid = await sut.upload(mockRequest())
    expect(isValid).toBeNull()
  })
  test('Should throw if uploadFileStorage throws', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    jest.spyOn(uploadFileStorageStub, 'uploadFile').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.upload(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const file = await sut.upload(request)
    expect(file).toBe(true)
  })
})
