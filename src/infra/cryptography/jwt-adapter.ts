import { Decrypter } from '@/data/protocols'
import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter {
  async decrypt (text: string): Promise<string> {
    return jwt.verify(text, env.jwtSecret) as any
  }
}
