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
  findAll(
    page: number,
    limit: number,
    queryParams?: CharityQueryParams,
  ): Promise<{ charities: Charity[]; total: number }>;
  save(charity: Charity): Promise<Charity>;
  update(charity: Charity): Promise<Charity>;
  delete(id: number): Promise<void>;
}
