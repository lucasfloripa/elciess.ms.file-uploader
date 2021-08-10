import { LoadFile } from '@/domain/usecases'
import { LoadFileRepository, LoadFileStorage } from '@/data/protocols'

export class CloudFileLoad implements LoadFile {
  constructor (
    private readonly loadFileStorage: LoadFileStorage,
    private readonly loadFileRepository: LoadFileRepository
  ) { }

  async load (params: LoadFile.Params): Promise<any> {
    const originalName = await this.loadFileRepository.loadRegister(params)
    let file: any = null
    if (originalName) {
      file = await this.loadFileStorage.loadFile({
        bucket: params.bucket,
        originalName
      })
    } else {
      return null
    }
    return { file, originalName }
  }
}
