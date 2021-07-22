export interface UploadFile {
  upload: (uploadFileParams: UploadFile.Params) => Promise<boolean>
}

export namespace UploadFile {
  export type Params = {
    originalname: string
    mimetype: string
    path: string
  }
}
