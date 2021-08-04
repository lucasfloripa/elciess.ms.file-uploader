export interface RegisterFileRepository {
  register: (params: RegisterFileRepository.Params) => Promise<boolean>
}

export namespace RegisterFileRepository {
  export type Params = {
    id: string
    bucket: string
    originalname: string
    mimetype: string
  }
}
