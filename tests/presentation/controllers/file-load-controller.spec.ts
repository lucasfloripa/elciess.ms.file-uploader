import { LoadFile } from '@/domain/usecases'
import { FileLoadController } from '@/presentation/controllers/file-load-controller'
import { Validation } from '@/presentation/protocols'
import { mockValidationStub } from '@/tests/presentation/mocks'
import { badRequest } from '@/presentation/helpers'

const mockRequest = (): FileLoadController.Request => ({
  fileName: 'any_name',
  bucket: 'any_bucket'
})

const mockLoadFileStub = (): LoadFile => {
  class LoadFileStub implements LoadFile {
    async load (params: LoadFile.Params): Promise<any> {
      return 'any_file'
    }
  }
  return new LoadFileStub()
}

type SutTypes = {
  sut: FileLoadController
  validationStub: Validation
  loadFileStub: LoadFile
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const loadFileStub = mockLoadFileStub()
  const sut = new FileLoadController(validationStub, loadFileStub)
  return { sut, validationStub, loadFileStub }
}

describe('FileLoad Controller', () => {
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
})
