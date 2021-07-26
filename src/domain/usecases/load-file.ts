export interface LoadFile {
  load: (params: LoadFile.Params) => Promise<LoadFile.Result>
}

export namespace LoadFile {
  export type Params = {
    fileName: string
    bucket: string
  }
  export type Result = any
}
