import { LoadFileRepository } from '@/data/protocols'

export const mockLoadFileRepositoryStub = (): LoadFileRepository => {
  class LoadFileRepositoryStub implements LoadFileRepository {
    async loadRegister (params: LoadFileRepository.Params): Promise<string> {
      return 'any_originalName'
    }
  }
  return new LoadFileRepositoryStub()
}
