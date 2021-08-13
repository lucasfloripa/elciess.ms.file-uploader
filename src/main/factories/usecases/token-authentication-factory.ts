import { TokenAuthentication } from '@/data/usecases'
import { JwtAdapter } from '@/infra/cryptography'

export const makeTokenAuthentication = (): TokenAuthentication => {
  const decrypter = new JwtAdapter()
  return new TokenAuthentication(decrypter)
}
