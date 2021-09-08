import { UploadFileStorage } from '@/data/protocols'

export const mockUploadFileStorageStub = (): UploadFileStorage => {
  class UploadFileStorageStub implements UploadFileStorage {
    async uploadFile (uploadFileParams: UploadFileStorage.Params): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new UploadFileStorageStub()
}
