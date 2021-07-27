import { LoadFile } from '@/domain/usecases'
import { LoadFileStorage } from '@/data/protocols'

export class CloudFileLoad implements LoadFile {
  constructor (
    private readonly loadFileStorage: LoadFileStorage
  ) {}

  async load (params: LoadFile.Params): Promise<any> {
    await this.loadFileStorage.loadFile(params)
  }
}
