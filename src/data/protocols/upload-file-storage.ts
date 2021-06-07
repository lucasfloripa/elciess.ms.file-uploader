import { UploadFile } from '@/domain/usecases'

export interface UploadFileStorage {
  uploadFile: (uploadFileParams: UploadFileStorage.Params) => Promise<boolean>
}

export namespace UploadFileStorage {
  export type Params = UploadFile.Params
}
