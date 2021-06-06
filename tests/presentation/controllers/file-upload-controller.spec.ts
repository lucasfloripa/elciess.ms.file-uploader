import { FileUploadController } from '@/presentation/controllers/file-upload-controller'
import { badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mockValidationStub } from '@/tests/presentation/mocks'

const mockRequest = (): FileUploadController.Request => ({
  fieldname: 'fieldname',
  originalname: 'originalname',
  encoding: 'encoding',
  mimetype: 'mimetype',
  destination: 'destination',
  filename: 'filename',
  path: 'path',
  size: 1
})

type SutTypes = {
  sut: FileUploadController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const sut = new FileUploadController(validationStub)
  return { sut, validationStub }
}

describe('FileUpload Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
