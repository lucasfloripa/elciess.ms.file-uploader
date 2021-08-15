import { Decrypter } from '@/data/protocols'
import env from '@/main/config/env'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter {
  async decrypt (accessToken: string): Promise<boolean> {
    const isValid = jwt.verify(accessToken, env.jwtSecret, (err) => {
      if (err) {
        return false
      } else {
        return true
      }
    }) as unknown as boolean
    return isValid
  }
}
