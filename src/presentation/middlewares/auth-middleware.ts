import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { Authentication } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly authentication: Authentication
  ) { }

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const isValid = await this.authentication.auth(accessToken)
        if (isValid) {
          return ok(isValid)
        }
        return forbidden(new AccessDeniedError())
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
