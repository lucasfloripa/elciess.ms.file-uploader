import { RegisterFileRepository } from '@/data/protocols'

export const mockRegisterFileRepositoryStub = (): RegisterFileRepository => {
  class RegisterFileRepositoryStub implements RegisterFileRepository {
    async register (params: RegisterFileRepository.Params): Promise<void> {
      return null
    }
  }
  return new RegisterFileRepositoryStub()
}
