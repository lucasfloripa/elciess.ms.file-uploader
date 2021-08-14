import { Decrypter } from '@/data/protocols'
import env from '@/main/config/env'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter {
  async decrypt (accessToken: string): Promise<boolean> {
    let result: boolean
    jwt.verify(accessToken, env.jwtSecret, (err) => {
      if (err) {
        result = false
      } else {
        result = true
      }
    })
    return result
  }
}
