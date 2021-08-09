import { LoadFile } from '@/domain/usecases'
import { LoadFileRepository, LoadFileStorage } from '@/data/protocols'

export class CloudFileLoad implements LoadFile {
  constructor (
    private readonly loadFileStorage: LoadFileStorage,
    private readonly loadFileRepository: LoadFileRepository
  ) {}

  async load (params: LoadFile.Params): Promise<any> {
    await this.loadFileRepository.loadRegister(params)
    const file = await this.loadFileStorage.loadFile(params)
    if (!file) {
      return null
    }
    return file
  }
}
