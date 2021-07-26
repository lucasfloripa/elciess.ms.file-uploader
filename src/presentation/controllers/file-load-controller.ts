import { LoadFile } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class FileLoadController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadFile: LoadFile
  ) {}

  async handle (request: FileLoadController.Request): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}

export namespace FileLoadController {
  export type Request = {
    fileName: string
    bucket: string
  }
}
