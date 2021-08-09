import { CloudFileLoad } from '@/data/usecases'
import { LoadFileRepository, LoadFileStorage } from '@/data/protocols'
import { LoadFile } from '@/domain/usecases'

const makeRequest = (): LoadFile.Params => ({
  id: 'any_id',
  bucket: 'any_bucket'
})

const mockLoadFileStorageStub = (): LoadFileStorage => {
  class LoadFileStorageStub implements LoadFileStorage {
    async loadFile (loadFileParams: LoadFileStorage.Params): Promise<any> {
      return Promise.resolve('any_file')
    }
  }
  return new LoadFileStorageStub()
}

const mockLoadFileRepositoryStub = (): LoadFileRepository => {
  class LoadFileRepositoryStub implements LoadFileRepository {
    async loadRegister (params: LoadFileRepository.Params): Promise<string> {
      return 'any_originalname'
    }
  }
  return new LoadFileRepositoryStub()
}

type SutTypes = {
  sut: CloudFileLoad
  loadFileStorageStub: LoadFileStorage
  loadFileRepositoryStub: LoadFileRepository
}

const makeSut = (): SutTypes => {
  const loadFileStorageStub = mockLoadFileStorageStub()
  const loadFileRepositoryStub = mockLoadFileRepositoryStub()
  const sut = new CloudFileLoad(loadFileStorageStub, loadFileRepositoryStub)
  return { sut, loadFileStorageStub, loadFileRepositoryStub }
}

describe('CloudFileLoad', () => {
  test('Should call LoadFileStorage with correct values', async () => {
    const { sut, loadFileStorageStub } = makeSut()
    const loadFileSpy = jest.spyOn(loadFileStorageStub, 'loadFile')
    const request = makeRequest()
    await sut.load(request)
    expect(loadFileSpy).toHaveBeenCalledWith({ bucket: 'any_bucket', originalName: 'any_originalname' })
  })
  test('Should return null if LoadFileStorage returns null', async () => {
    const { sut, loadFileStorageStub } = makeSut()
    jest.spyOn(loadFileStorageStub, 'loadFile').mockReturnValueOnce(Promise.resolve(null))
    const request = makeRequest()
    const file = await sut.load(request)
    expect(file).toBeNull()
  })
  test('Should throw if loadFileStorage throws', async () => {
    const { sut, loadFileStorageStub } = makeSut()
    jest.spyOn(loadFileStorageStub, 'loadFile').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.load(makeRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should call LoadFileRepository with correct values', async () => {
    const { sut, loadFileRepositoryStub } = makeSut()
    const loadFileSpy = jest.spyOn(loadFileRepositoryStub, 'loadRegister')
    const request = makeRequest()
    await sut.load(request)
    expect(loadFileSpy).toHaveBeenCalledWith(request)
  })
  test('Should return null if LoadFileRepository returns null', async () => {
    const { sut, loadFileRepositoryStub } = makeSut()
    jest.spyOn(loadFileRepositoryStub, 'loadRegister').mockReturnValueOnce(Promise.resolve(null))
    const request = makeRequest()
    const file = await sut.load(request)
    expect(file).toBeNull()
  })
  test('Should throw if LoadFileRepository throws', async () => {
    const { sut, loadFileRepositoryStub } = makeSut()
    jest.spyOn(loadFileRepositoryStub, 'loadRegister').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.load(makeRequest())
    await expect(promise).rejects.toThrow()
  })
  test('Should return a file on success', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const file = await sut.load(request)
    expect(file).toBe('any_file')
  })
})
