import { Authentication } from '@/domain/usecases'

export const mockAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (data: any): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AuthenticationStub()
}
