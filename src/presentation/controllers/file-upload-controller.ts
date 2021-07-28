import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers'
import { UploadFile } from '@/domain/usecases'

export class FileUploadController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly uploadFile: UploadFile
  ) { }

  async handle (request: FileUploadController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.uploadFile.upload(request)
      if (!isValid) {
        return notFound()
      }
      return ok({ message: 'File Uploaded!' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FileUploadController {
  export type Request = {
    originalname: string
    mimetype: string
    path: string
  }
}
