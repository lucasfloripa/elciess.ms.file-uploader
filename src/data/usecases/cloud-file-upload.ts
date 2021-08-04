import { UploadFile } from '@/domain/usecases'
import { UploadFileStorage, IdGenerator } from '@/data/protocols'

export class CloudFileUpload implements UploadFile {
  constructor (
    private readonly uploadFileStorage: UploadFileStorage,
    private readonly idGenerator: IdGenerator
  ) { }

  async upload (uploadFileParams: UploadFile.Params): Promise<boolean> {
    await this.idGenerator.generate()
    const isValid = await this.uploadFileStorage.uploadFile(uploadFileParams)
    return isValid
  }
}
