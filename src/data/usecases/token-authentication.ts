import { Authentication } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class TokenAuthentication implements Authentication {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async auth (data: any): Promise<boolean> {
    await this.decrypter.decrypt(data)
    return true
  }
}
