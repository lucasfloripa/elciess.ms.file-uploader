import { AuthMiddleware } from '@/presentation/middlewares'
import { makeTokenAuthentication } from '@/main/factories/usecases'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeTokenAuthentication())
}
