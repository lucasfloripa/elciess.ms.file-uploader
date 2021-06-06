import { UploadFile } from '@/domain/usecases'

export const mockUploadFileStub = (): UploadFile => {
  class UploadFileStub implements UploadFile {
    async upload (uploadFileParams: UploadFile.Params): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new UploadFileStub()
}
