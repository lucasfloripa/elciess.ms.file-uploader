import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'
import { makeFileLoadValidation } from '@/main/factories/validation'

jest.mock('@/utils/validators/validation-composite')

describe('FileLoadController Validation', () => {
  test('Should call Validation Composite with all Validators', () => {
    makeFileLoadValidation()
    const validations: Validation[] = []
    for (const field of ['bucket', 'id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
