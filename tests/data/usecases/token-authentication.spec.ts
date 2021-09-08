import { TokenAuthentication } from '@/data/usecases'
import { Decrypter } from '@/data/protocols'
import { mockDecrypterStub } from '@/tests/data/mocks'

export type SutTypes = {
  sut: TokenAuthentication
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypterStub()
  const sut = new TokenAuthentication(decrypterStub)
  return { sut, decrypterStub }
}
describe('TokenAuthentication', () => {
  test('Should call decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.auth('access_token')
    expect(decryptSpy).toBeCalledWith('access_token')
  })
  test('Should return false if decrypter fails', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(false))
    const decrypt = await sut.auth('any_token')
    expect(decrypt).toBeFalsy()
  })
  test('Should throw if decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth('any_token')
    await expect(promise).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const decrypt = await sut.auth('any_token')
    expect(decrypt).toBeTruthy()
  })
})
