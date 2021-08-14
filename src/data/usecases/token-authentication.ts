import { Authentication } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class TokenAuthentication implements Authentication {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async auth (accessToken: string): Promise<boolean> {
    const decryptToken = await this.decrypter.decrypt(accessToken)
    if (decryptToken) {
      return true
    }
    return false
  }
}
