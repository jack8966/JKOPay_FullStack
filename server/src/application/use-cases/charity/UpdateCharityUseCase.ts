import { Charity } from '../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../domain/repositories/ICharityRepository';

export class UpdateCharityUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async execute(id: number, charityData: Partial<Charity>): Promise<Charity | null> {
    const charity = await this.charityRepository.findById(id);
    if (!charity) {
      return null;
    }
    return this.charityRepository.update(id, charityData);
  }
}
