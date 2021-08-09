export interface LoadFileRepository {
  loadRegister: (params: LoadFileRepository.Params) => Promise<string>
}

export namespace LoadFileRepository {
  export type Params = {
    bucket: string
    id: string
  }
}
