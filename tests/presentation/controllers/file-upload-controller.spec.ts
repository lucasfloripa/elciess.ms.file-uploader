import { UploadFile } from '@/domain/usecases'
import { FileUploadController } from '@/presentation/controllers/file-upload-controller'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { mockUploadFileStub, mockValidationStub } from '@/tests/presentation/mocks'

const mockRequest = (): FileUploadController.Request => ({
  originalname: 'originalname',
  mimetype: 'mimetype',
  path: 'path'
})

type SutTypes = {
  sut: FileUploadController
  validationStub: Validation
  uploadFileStub: UploadFile
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const uploadFileStub = mockUploadFileStub()
  const sut = new FileUploadController(validationStub, uploadFileStub)
  return { sut, validationStub, uploadFileStub }
}

describe('FileUpload Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call uploadFile with correct values', async () => {
    const { sut, uploadFileStub } = makeSut()
    const validateSpy = jest.spyOn(uploadFileStub, 'upload')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 403 if uploadFile returns false', async () => {
    const { sut, uploadFileStub } = makeSut()
    jest.spyOn(uploadFileStub, 'upload').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if uploadFile throws', async () => {
    const { sut, uploadFileStub } = makeSut()
    jest.spyOn(uploadFileStub, 'upload').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ message: 'File Uploaded!' }))
  })
})
