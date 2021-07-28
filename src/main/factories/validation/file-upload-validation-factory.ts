import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/utils/validators'

export const makeFileUploadValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['bucket', 'originalname', 'mimetype', 'path']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
