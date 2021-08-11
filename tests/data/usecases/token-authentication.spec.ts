import { TokenAuthentication } from '@/data/usecases'
import { Decrypter } from '@/data/protocols'

const mockDescrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (text: string): Promise<string> {
      return Promise.resolve('any_data')
    }
  }
  return new DecrypterStub()
}

export type SutTypes = {
  sut: TokenAuthentication
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDescrypterStub()
  const sut = new TokenAuthentication(decrypterStub)
  return { sut, decrypterStub }
}
describe('TokenAuthentication', () => {
  test('Should call decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.auth('any_data')
    expect(decryptSpy).toBeCalledWith('any_data')
  })
  test('Should return false if decrypter fails', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const decrypt = await sut.auth('any_token')
    expect(decrypt).toBeNull()
  })
})
