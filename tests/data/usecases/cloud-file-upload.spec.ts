import { CloudFileUpload } from '@/data/usecases'
import { UploadFileStorage, IdGenerator, RegisterFileRepository } from '@/data/protocols'
import { UploadFile } from '@/domain/usecases'
import { mockUploadFileStorageStub, mockIdGeneratorStub, mockRegisterFileRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): UploadFile.Params => ({
  bucket: 'any_bucket',
  originalname: 'originalname',
  mimetype: 'mimetype',
  path: 'path'
})

type SutTypes = {
  sut: CloudFileUpload
  uploadFileStorageStub: UploadFileStorage
  idGeneratorStub: IdGenerator
  registerFileRepositoryStub: RegisterFileRepository
}

const makeSut = (): SutTypes => {
  const uploadFileStorageStub = mockUploadFileStorageStub()
  const idGeneratorStub = mockIdGeneratorStub()
  const registerFileRepositoryStub = mockRegisterFileRepositoryStub()
  const sut = new CloudFileUpload(uploadFileStorageStub, idGeneratorStub, registerFileRepositoryStub)
  return { sut, uploadFileStorageStub, idGeneratorStub, registerFileRepositoryStub }
}

describe('CloudFileUpload Data Usecase', () => {
  test('Should call uploadFileStorage with correct values', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    const uploadFileSpy = jest.spyOn(uploadFileStorageStub, 'uploadFile')
    const request = mockRequest()
    await sut.upload(request)
    expect(uploadFileSpy).toHaveBeenCalledWith(request)
  })
  test('Should return false if uploadFileStorage returns false', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    jest.spyOn(uploadFileStorageStub, 'uploadFile').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.upload(mockRequest())
    expect(isValid).toBeFalsy()
  })
  test('Should throw if uploadFileStorage throws', async () => {
    const { sut, uploadFileStorageStub } = makeSut()
    jest.spyOn(uploadFileStorageStub, 'uploadFile').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.upload(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should call idGenerator with correctly', async () => {
    const { sut, idGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(idGeneratorStub, 'generate')
    const request = mockRequest()
    await sut.upload(request)
    expect(generateSpy).toHaveBeenCalled()
  })
  test('Should throw if idGenerator throws', async () => {
    const { sut, idGeneratorStub } = makeSut()
    jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.upload(mockRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should call registerFileRepository with correct values', async () => {
    const { sut, registerFileRepositoryStub } = makeSut()
    const registerSpy = jest.spyOn(registerFileRepositoryStub, 'register')
    const request = mockRequest()
    await sut.upload(request)
    expect(registerSpy).toHaveBeenCalledWith({ id: 'any_generated_id', bucket: 'any_bucket', originalname: 'originalname', mimetype: 'mimetype' })
  })
  test('Should throw if registerFileRepository throws', async () => {
    const { sut, registerFileRepositoryStub } = makeSut()
    jest.spyOn(registerFileRepositoryStub, 'register').mockImplementationOnce(async () => await Promise.reject(new Error()))
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
