import { Repository, In } from 'typeorm';
import { AppDataSource } from '../database/typeorm.config';
import { Charity } from '../../domain/entities/Charity.entity';
import {
  CharityQueryParams,
  ICharityRepository,
} from '../../domain/repositories/ICharityRepository';

export class CharityRepository implements ICharityRepository {
  private repository: Repository<Charity>;

  constructor() {
    this.repository = AppDataSource.getRepository(Charity);
  }

  async findById(id: number): Promise<Charity | null> {
    return this.repository.findOneBy({ id, validFlag: true });
  }

  async findByIds(ids: number[]): Promise<Charity[]> {
    return this.repository.findBy({ id: In(ids), validFlag: true });
  }

  async findAll(
    page: number,
    limit: number,
    queryParams?: CharityQueryParams,
  ): Promise<{ charities: Charity[]; total: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.repository.createQueryBuilder('charity');

    queryBuilder.where('charity.validFlag = :validFlag', { validFlag: true });

    if (queryParams?.name) {
      queryBuilder.andWhere('charity.name LIKE :name', { name: `%${queryParams.name}%` });
    }

    if (queryParams?.orderBy) {
      queryBuilder.orderBy(`charity.${queryParams.orderBy}`, queryParams.order || 'ASC');
    } else {
      queryBuilder.orderBy('charity.id', queryParams?.order || 'ASC');
    }

    const [charities, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    return { charities, total };
  }

  async create(charityData: Partial<Charity>): Promise<Charity> {
    const charity = this.repository.create({ ...charityData, validFlag: true });
    return this.repository.save(charity);
  }

  async createMany(charitiesData: Partial<Charity>[]): Promise<Charity[]> {
    const charities = charitiesData.map((data) =>
      this.repository.create({ ...data, validFlag: true }),
    );
    return this.repository.save(charities);
  }

  async update(id: number, charityData: Partial<Charity>): Promise<Charity | null> {
    await this.repository.update(id, charityData);
    return this.findById(id);
  }

  async updateMany(charities: { id: number; data: Partial<Charity> }[]): Promise<Charity[]> {
    const updatedCharities: Charity[] = [];

    for (const { id, data } of charities) {
      await this.repository.update(id, data);
      const updated = await this.findById(id);
      if (updated) {
        updatedCharities.push(updated);
      }
    }

    return updatedCharities;
  }

  async delete(id: number): Promise<Charity | null> {
    await this.repository.update(id, { validFlag: false });
    return this.findById(id);
  }

  async deleteMany(ids: number[]): Promise<boolean> {
    const result = await this.repository.update({ id: In(ids) }, { validFlag: false });
    return result.affected ? result.affected > 0 : false;
  }
}
