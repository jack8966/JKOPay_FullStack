import { CreateCharityUseCase } from '../CreateCharityUseCase';
import { Charity } from '../../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../../domain/repositories/ICharityRepository';

describe('CreateCharityUseCase', () => {
  let createCharityUseCase: CreateCharityUseCase;
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

    createCharityUseCase = new CreateCharityUseCase(mockCharityRepository);
  });

  it('should create a charity successfully', async () => {
    // Arrange
    const charityData = {
      name: 'Test Charity',
      description: 'Test Description',
      imageUrl: 'https://example.com/image.jpg',
    };

    const mockCharity = new Charity();
    Object.assign(mockCharity, {
      id: 1,
      name: charityData.name,
      description: charityData.description,
      imageUrl: charityData.imageUrl,
      validFlag: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockCharityRepository.create.mockResolvedValue(mockCharity);

    // Act
    const result = await createCharityUseCase.execute(charityData);

    // Assert
    expect(mockCharityRepository.create).toHaveBeenCalledWith(charityData);
    expect(result).toEqual(mockCharity);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const charityData = {
      name: 'Test Charity',
      description: 'Test Description',
      imageUrl: 'https://example.com/image.jpg',
    };

    const error = new Error('Repository error');
    mockCharityRepository.create.mockRejectedValue(error);

    // Act & Assert
    await expect(createCharityUseCase.execute(charityData)).rejects.toThrow('Repository error');
  });
});
