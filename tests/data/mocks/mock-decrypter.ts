import { Decrypter } from '@/data/protocols'

export const mockDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (acessToken: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new DecrypterStub()
}
