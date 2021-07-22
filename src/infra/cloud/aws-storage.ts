import { UploadFileStorage } from '@/data/protocols'

export class AwsStorage implements UploadFileStorage {
  async uploadFile (uploadFileParams: UploadFileStorage.Params): Promise<boolean> {
    return true
  }
}
