import { JwtAdapter } from '@/infra/cryptography'

import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async verify (): Promise<boolean> {
    return true
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
      await sut.decrypt('accessToken')
      expect(decryptSpy).toHaveBeenCalledWith('accessToken', env.jwtSecret, expect.any(Function))
    })
    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
        throw new Error()
      })
      const promise = sut.decrypt('accessToken')
      await expect(promise).rejects.toThrow()
    })
    test('Should return true on verify success', async () => {
      const sut = makeSut()
      const isValid = await sut.decrypt('accessToken')
      expect(isValid).toBeTruthy()
    })
  })
})
