import { AuthMiddleware } from '@/presentation/middlewares'
import { makeTokenAuthentication } from '@/main/factories/usecases'

export const makeAuthAdminMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeTokenAuthentication())
}
