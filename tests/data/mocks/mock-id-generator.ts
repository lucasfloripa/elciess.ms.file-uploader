import { IdGenerator } from '@/data/protocols'

export const mockIdGeneratorStub = (): IdGenerator => {
  class IdGeneratorStub implements IdGenerator {
    async generate (): Promise<string> {
      return 'any_generated_id'
    }
  }
  return new IdGeneratorStub()
}
