import { DeleteCharityUseCase } from '../DeleteCharityUseCase';
import { Charity } from '../../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../../domain/repositories/ICharityRepository';

describe('DeleteCharityUseCase', () => {
  let deleteCharityUseCase: DeleteCharityUseCase;
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

    deleteCharityUseCase = new DeleteCharityUseCase(mockCharityRepository);
  });

  it('should soft delete a charity successfully', async () => {
    // Arrange
    const id = 1;
    const existingCharity = new Charity();
    Object.assign(existingCharity, {
      id,
      name: 'Test Charity',
      description: 'Test Description',
      imageUrl: 'https://example.com/image.jpg',
      validFlag: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const deletedCharity = new Charity();
    Object.assign(deletedCharity, {
      ...existingCharity,
      validFlag: false,
    });

    mockCharityRepository.findById.mockResolvedValue(existingCharity);
    mockCharityRepository.delete.mockResolvedValue(deletedCharity);

    // Act
    const result = await deleteCharityUseCase.execute(id);

    // Assert
    expect(mockCharityRepository.findById).toHaveBeenCalledWith(id);
    expect(mockCharityRepository.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedCharity);
  });

  it('should return null when charity is not found and throw error', async () => {
    // Arrange
    const id = 999;
    mockCharityRepository.findById.mockResolvedValue(null);
    mockCharityRepository.delete.mockResolvedValue(null);

    // Act
    const result = await deleteCharityUseCase.execute(id);

    // Assert
    expect(mockCharityRepository.findById).toHaveBeenCalledWith(id);
    expect(mockCharityRepository.delete).not.toHaveBeenCalled();
    expect(result).toBe(null);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const id = 1;
    const error = new Error('Repository error');
    mockCharityRepository.findById.mockRejectedValue(error);

    // Act & Assert
    await expect(deleteCharityUseCase.execute(id)).rejects.toThrow('Repository error');
  });
});
