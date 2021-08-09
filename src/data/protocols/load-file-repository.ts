export interface LoadFileRepository {
  loadFile: (params: LoadFileRepository.Params) => Promise<boolean>
}

export namespace LoadFileRepository {
  export type Params = {
    bucket: string
    id: string
  }
}
