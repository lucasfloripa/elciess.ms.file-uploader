import { JwtAdapter } from '@/infra/cryptography'

import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async verify (): Promise<string> {
    return 'value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter()
}

describe('Jwt Adapter', () => {
  describe('decrypt()', () => {
    test('Should call decrypt with correct values', async () => {
      const sut = makeSut()
      const decryptSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('data')
      expect(decryptSpy).toHaveBeenCalledWith('data', env.jwtSecret)
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
        throw new Error()
      })
      const promise = sut.decrypt('data')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('data')
      expect(value).toBe('value')
    })
  })
})
