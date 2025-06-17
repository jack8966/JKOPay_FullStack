import { Charity } from '../entities/Charity.entity';

export interface CharityQueryParams {
  name?: string;
  order?: 'ASC' | 'DESC';
  orderBy?: 'name' | 'createdAt' | 'updatedAt';
  // 未來可以在此添加更多查詢參數
  // description?: string;
  // status?: string;
  // etc...
}

export interface ICharityRepository {
  findById(id: number): Promise<Charity | null>;
  findByIds(ids: number[]): Promise<Charity[]>;
  findAll(
    page: number,
    limit: number,
    queryParams?: CharityQueryParams,
  ): Promise<{ charities: Charity[]; total: number }>;
  create(charity: Partial<Charity>): Promise<Charity>;
  createMany(charities: Partial<Charity>[]): Promise<Charity[]>;
  update(id: number, charity: Partial<Charity>): Promise<Charity | null>;
  updateMany(charities: { id: number; data: Partial<Charity> }[]): Promise<Charity[]>;
  delete(id: number): Promise<Charity | null>;
  deleteMany(ids: number[]): Promise<boolean>;
}
