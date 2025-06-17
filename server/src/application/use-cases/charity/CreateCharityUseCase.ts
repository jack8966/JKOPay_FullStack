import { Charity } from '../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../domain/repositories/ICharityRepository';

export class CreateCharityUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async execute(charityData: Partial<Charity>): Promise<Charity> {
    return this.charityRepository.create(charityData);
  }
}
