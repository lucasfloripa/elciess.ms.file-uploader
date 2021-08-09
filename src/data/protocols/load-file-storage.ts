export interface LoadFileStorage {
  loadFile: (loadFileParams: LoadFileStorage.Params) => Promise<any>
}

export namespace LoadFileStorage {
  export type Params = {
    originalName: string
    bucket: string
  }
}
