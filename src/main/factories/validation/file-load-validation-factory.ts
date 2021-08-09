import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/utils/validators'

export const makeFileLoadValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['bucket', 'id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
