import { Repository } from 'typeorm';
import { Charity } from '../../domain/entities/Charity';
import {
  CharityQueryParams,
  ICharityRepository,
} from '../../domain/repositories/ICharityRepository';
import { AppDataSource } from '../database/typeorm.config';

export class CharityRepository implements ICharityRepository {
  private repository: Repository<Charity>;

  constructor() {
    this.repository = AppDataSource.getRepository(Charity);
  }

  async findById(id: number): Promise<Charity | null> {
    return this.repository.findOneBy({ id: id });
  }

  async findAll(
    page: number,
    limit: number,
    queryParams?: CharityQueryParams,
  ): Promise<{ charities: Charity[]; total: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.repository.createQueryBuilder('charity');

    if (queryParams?.name) {
      queryBuilder.where('charity.name LIKE :name', { name: `%${queryParams.name}%` });
    }

    if (queryParams?.orderBy) {
      queryBuilder.orderBy(`charity.${queryParams.orderBy}`, queryParams.order || 'ASC');
    } else {
      queryBuilder.orderBy('charity.id', queryParams?.order || 'ASC');
    }

    const [charities, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    return { charities, total };
  }

  async save(charity: Charity): Promise<Charity> {
    return this.repository.save(charity);
  }

  async update(charity: Charity): Promise<Charity> {
    return this.repository.save(charity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
