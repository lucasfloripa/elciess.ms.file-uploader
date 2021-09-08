import { LoadFile } from '@/domain/usecases'

export const mockLoadFileStub = (): LoadFile => {
  class LoadFileStub implements LoadFile {
    async load (params: LoadFile.Params): Promise<any> {
      return { file: 'any_file', originalName: 'any_originalName' }
    }
  }
  return new LoadFileStub()
}
