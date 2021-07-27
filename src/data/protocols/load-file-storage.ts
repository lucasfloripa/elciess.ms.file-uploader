import { LoadFile } from '@/domain/usecases'

export interface LoadFileStorage {
  loadFile: (loadFileParams: LoadFileStorage.Params) => Promise<any>
}

export namespace LoadFileStorage {
  export type Params = LoadFile.Params
}
