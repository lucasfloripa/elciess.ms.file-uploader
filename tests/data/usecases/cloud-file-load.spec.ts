import { CloudFileLoad } from '@/data/usecases'
import { LoadFileStorage } from '@/data/protocols'
import { LoadFile } from '@/domain/usecases'

const makeRequest = (): LoadFile.Params => ({
  bucket: 'any_bucket',
  fileName: 'any_fileName'
})

const mockLoadFileStorageStub = (): LoadFileStorage => {
  class LoadFileStorageStub implements LoadFileStorage {
    async loadFile (loadFileParams: LoadFile.Params): Promise<any> {
      return Promise.resolve(true)
    }
  }
  return new LoadFileStorageStub()
}

type SutTypes = {
  sut: CloudFileLoad
  loadFileStorageStub: LoadFileStorage
}

const makeSut = (): SutTypes => {
  const loadFileStorageStub = mockLoadFileStorageStub()
  const sut = new CloudFileLoad(loadFileStorageStub)
  return { sut, loadFileStorageStub }
}

describe('CloudFileLoad', () => {
  test('Should call LoadFileStorage with correct values', async () => {
    const { sut, loadFileStorageStub } = makeSut()
    const loadFileSpy = jest.spyOn(loadFileStorageStub, 'loadFile')
    const request = makeRequest()
    await sut.load(request)
    expect(loadFileSpy).toHaveBeenCalledWith(request)
  })
})
