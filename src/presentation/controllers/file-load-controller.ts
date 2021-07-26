import { LoadFile } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class FileLoadController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadFile: LoadFile
  ) {}

  async handle (request: FileLoadController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace FileLoadController {
  export type Request = {
    fileName: string
    bucket: string
  }
}
