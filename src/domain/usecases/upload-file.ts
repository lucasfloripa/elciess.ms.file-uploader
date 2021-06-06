export interface UploadFile {
  upload: (uploadFileParams: UploadFile.Params) => Promise<boolean>
}

export namespace UploadFile {
  export type Params = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}
