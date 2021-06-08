import { FileUploadController } from '@/presentation/controllers'
import { makeCloudFileUpload } from '@/main/factories/usecases'
import { makeFileUploadValidation } from '@/main/factories/validation'

export const makeFileUploadController = (): FileUploadController => {
  return new FileUploadController(makeFileUploadValidation(), makeCloudFileUpload())
}
