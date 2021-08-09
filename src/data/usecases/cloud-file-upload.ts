import { UploadFile } from '@/domain/usecases'
import { UploadFileStorage, IdGenerator, RegisterFileRepository } from '@/data/protocols'

export class CloudFileUpload implements UploadFile {
  constructor (
    private readonly uploadFileStorage: UploadFileStorage,
    private readonly idGenerator: IdGenerator,
    private readonly registerFileRepository: RegisterFileRepository
  ) { }

  async upload (uploadFileParams: UploadFile.Params): Promise<boolean> {
    const { bucket, mimetype, originalname } = uploadFileParams
    const uuid = await this.idGenerator.generate()
    const isValid = await this.uploadFileStorage.uploadFile(uploadFileParams)
    if (isValid) {
      await this.registerFileRepository.register({
        id: uuid,
        bucket,
        mimetype,
        originalname
      })
    }
    return isValid
  }
}
