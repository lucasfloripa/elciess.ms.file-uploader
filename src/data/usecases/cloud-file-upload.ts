import { UploadFile } from '@/domain/usecases'
import { UploadFileStorage } from '@/data/protocols/upload-file-storage'

export class CloudFileUpload implements UploadFile {
  constructor (
    private readonly uploadFileStorage: UploadFileStorage
  ) {}

  async upload (uploadFileParams: UploadFile.Params): Promise<boolean> {
    const isValid = await this.uploadFileStorage.uploadFile(uploadFileParams)
    return isValid
  }
}
