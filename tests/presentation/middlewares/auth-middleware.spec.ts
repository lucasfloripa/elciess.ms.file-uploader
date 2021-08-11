import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { TokenAuthentication } from '@/domain/usecases'

const mockTokenAuthenticationStub = (): TokenAuthentication => {
  class TokenAuthenticationStub implements TokenAuthentication {
    async auth (token: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new TokenAuthenticationStub()
}

type SutTypes = {
  sut: AuthMiddleware
  tokenAuthenticationStub: TokenAuthentication
}

const makeSut = (): SutTypes => {
  const tokenAuthenticationStub = mockTokenAuthenticationStub()
  const sut = new AuthMiddleware(tokenAuthenticationStub)
  return { sut, tokenAuthenticationStub }
}

describe('AuthMiddleware', () => {
  test('Should return 401 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: '' })
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call tokenAuthentication with correct value', async () => {
    const { sut, tokenAuthenticationStub } = makeSut()
    const authSpy = jest.spyOn(tokenAuthenticationStub, 'auth')
    await sut.handle({ accessToken: 'any_access_token' })
    expect(authSpy).toHaveBeenCalledWith('any_access_token')
  })

  test('Should return 403 if tokenAuthentication returns null', async () => {
    const { sut, tokenAuthenticationStub } = makeSut()
    jest.spyOn(tokenAuthenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if tokenAuthentication returns true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(ok(true))
  })

  test('Should return 500 if tokenAuthentication throws', async () => {
    const { sut, tokenAuthenticationStub } = makeSut()
    jest.spyOn(tokenAuthenticationStub, 'auth').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
