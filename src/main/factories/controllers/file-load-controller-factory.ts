import { FileLoadController } from '@/presentation/controllers'
import { makeCloudFileLoad } from '@/main/factories/usecases'
import { makeFileLoadValidation } from '@/main/factories/validation'

export const makeFileLoadController = (): FileLoadController => {
  return new FileLoadController(makeFileLoadValidation(), makeCloudFileLoad())
}
