import { ListCharitiesUseCase } from '../ListCharitiesUseCase';
import { Charity } from '../../../../domain/entities/Charity.entity';
import {
  CharityQueryParams,
  ICharityRepository,
} from '../../../../domain/repositories/ICharityRepository';

describe('ListCharitiesUseCase', () => {
  let listCharitiesUseCase: ListCharitiesUseCase;
  let mockCharityRepository: jest.Mocked<ICharityRepository>;

  beforeEach(() => {
    mockCharityRepository = {
      findById: jest.fn(),
      findByIds: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    };

    listCharitiesUseCase = new ListCharitiesUseCase(mockCharityRepository);
  });

  it('should list charities successfully', async () => {
    // Arrange
    const charity1 = new Charity();
    Object.assign(charity1, {
      id: 1,
      name: 'Charity 1',
      description: 'Description 1',
      imageUrl: 'https://example.com/image1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const charity2 = new Charity();
    Object.assign(charity2, {
      id: 2,
      name: 'Charity 2',
      description: 'Description 2',
      imageUrl: 'https://example.com/image2.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockResponse = {
      charities: [charity1, charity2],
      total: 2,
    };

    mockCharityRepository.findAll.mockResolvedValue(mockResponse);

    const queryParams: CharityQueryParams = {
      name: 'Charity 1',
      order: 'ASC',
      orderBy: 'name',
    };

    // Act
    const result = await listCharitiesUseCase.execute({
      page: 1,
      limit: 10,
      queryParams,
    });

    // Assert
    expect(mockCharityRepository.findAll).toHaveBeenCalledWith(1, 10, queryParams);
    expect(result).toEqual({
      data: [charity1, charity2],
      total: 2,
      hasMore: false,
    });
  });

  it('should return empty array when no charities found', async () => {
    // Arrange
    const mockResponse = {
      charities: [],
      total: 0,
    };

    mockCharityRepository.findAll.mockResolvedValue(mockResponse);

    // Act
    const result = await listCharitiesUseCase.execute({
      page: 1,
      limit: 10,
    });

    // Assert
    expect(mockCharityRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);
    expect(result).toEqual({
      data: [],
      total: 0,
      hasMore: false,
    });
  });

  it('should handle repository errors', async () => {
    // Arrange
    const error = new Error('Repository error');
    mockCharityRepository.findAll.mockRejectedValue(error);

    // Act & Assert
    await expect(
      listCharitiesUseCase.execute({
        page: 1,
        limit: 10,
      }),
    ).rejects.toThrow('Repository error');
  });
});
