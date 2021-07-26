import { LoadFile } from '@/domain/usecases'
import { FileLoadController } from '@/presentation/controllers/file-load-controller'
import { Validation } from '@/presentation/protocols'
import { mockValidationStub } from '@/tests/presentation/mocks'
import { badRequest, notFound, serverError } from '@/presentation/helpers'

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

  test('Should call loadFile with correct values', async () => {
    const { sut, loadFileStub } = makeSut()
    const validateSpy = jest.spyOn(loadFileStub, 'load')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 404 if loadFile returns null', async () => {
    const { sut, loadFileStub } = makeSut()
    jest.spyOn(loadFileStub, 'load').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if loadFile throws', async () => {
    const { sut, loadFileStub } = makeSut()
    jest.spyOn(loadFileStub, 'load').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
