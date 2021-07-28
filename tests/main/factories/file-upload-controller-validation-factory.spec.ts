import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'
import { makeFileUploadValidation } from '@/main/factories/validation'

jest.mock('@/utils/validators/validation-composite')

describe('FileUploadController Validation', () => {
  test('Should call Validation Composite with all Validators', () => {
    makeFileUploadValidation()
    const validations: Validation[] = []
    for (const field of ['bucket', 'originalname', 'mimetype', 'path']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
