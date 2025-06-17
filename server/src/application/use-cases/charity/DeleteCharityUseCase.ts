import { Charity } from 'src/domain/entities/Charity.entity';
import { ICharityRepository } from '../../../domain/repositories/ICharityRepository';

export class DeleteCharityUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async execute(id: number): Promise<Charity | null> {
    const charity = await this.charityRepository.findById(id);
    if (!charity) {
      return null;
    }
    return this.charityRepository.delete(id);
  }
}
