import { ICharityRepository } from '../../../domain/repositories/ICharityRepository';

export class DeleteCharityUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async execute(id: number): Promise<boolean> {
    const charity = await this.charityRepository.findById(id);
    if (!charity) {
      return false;
    }
    return this.charityRepository.delete(id);
  }
}
