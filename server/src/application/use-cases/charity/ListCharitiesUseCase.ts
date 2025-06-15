import {
  ICharityRepository,
  CharityQueryParams,
} from '../../../domain/repositories/ICharityRepository';

export interface ListCharitiesDTO {
  page: number;
  limit: number;
  queryParams?: CharityQueryParams;
}

export interface ListCharitiesResponse {
  charities: Array<{
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total: number;
  hasMore: boolean;
}

export class ListCharitiesUseCase {
  constructor(private charityRepository: ICharityRepository) {}

  async execute(dto: ListCharitiesDTO): Promise<ListCharitiesResponse> {
    const { charities, total } = await this.charityRepository.findAll(
      dto.page,
      dto.limit,
      dto.queryParams,
    );

    const hasMore = total > dto.page * dto.limit;

    return {
      charities: charities.map((charity) => ({
        id: charity.getId(),
        name: charity.getName().getValue(),
        description: charity.getDescription().getValue(),
        createdAt: charity.getCreatedAt(),
        updatedAt: charity.getUpdatedAt(),
      })),
      total,
      hasMore,
    };
  }
}
