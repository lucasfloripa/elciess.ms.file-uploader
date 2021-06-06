import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helpers'
import { UploadFile } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'

export class FileUploadController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly uploadFile: UploadFile
  ) { }

  async handle (request: FileUploadController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const isValid = await this.uploadFile.upload(request)
    if (!isValid) {
      return forbidden(new AccessDeniedError())
    }
    return null
  }
}

export namespace FileUploadController {
  export type Request = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}
