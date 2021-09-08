import { LoadFileStorage } from '@/data/protocols'

export const mockLoadFileStorageStub = (): LoadFileStorage => {
  class LoadFileStorageStub implements LoadFileStorage {
    async loadFile (loadFileParams: LoadFileStorage.Params): Promise<any> {
      return Promise.resolve('any_file')
    }
  }
  return new LoadFileStorageStub()
}
