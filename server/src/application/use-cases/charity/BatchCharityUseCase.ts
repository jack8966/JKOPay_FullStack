import { Charity } from '../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../domain/repositories/ICharityRepository';

export class BatchCharityUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async findByIds(ids: number[]): Promise<Charity[]> {
    return this.charityRepository.findByIds(ids);
  }

  async createMany(charitiesData: Partial<Charity>[]): Promise<Charity[]> {
    return this.charityRepository.createMany(charitiesData);
  }

  async updateMany(charities: { id: number; data: Partial<Charity> }[]): Promise<Charity[]> {
    return this.charityRepository.updateMany(charities);
  }

  async deleteMany(ids: number[]): Promise<boolean> {
    return this.charityRepository.deleteMany(ids);
  }
}
