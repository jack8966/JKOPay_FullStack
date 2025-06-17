import { UpdateCharityUseCase } from '../UpdateCharityUseCase';
import { Charity } from '../../../../domain/entities/Charity.entity';
import { ICharityRepository } from '../../../../domain/repositories/ICharityRepository';

describe('UpdateCharityUseCase', () => {
  let updateCharityUseCase: UpdateCharityUseCase;
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

    updateCharityUseCase = new UpdateCharityUseCase(mockCharityRepository);
  });

  it('should update a charity successfully', async () => {
    // Arrange
    const id = 1;
    const updateData = {
      name: 'Updated Charity',
      description: 'Updated Description',
    };

    const existingCharity = new Charity();
    Object.assign(existingCharity, {
      id,
      name: 'Original Charity',
      description: 'Original Description',
      imageUrl: 'https://example.com/image.jpg',
      validFlag: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const updatedCharity = new Charity();
    Object.assign(updatedCharity, {
      ...existingCharity,
      ...updateData,
    });

    mockCharityRepository.findById.mockResolvedValue(existingCharity);
    mockCharityRepository.update.mockResolvedValue(updatedCharity);

    // Act
    const result = await updateCharityUseCase.execute(id, updateData);

    // Assert
    expect(mockCharityRepository.findById).toHaveBeenCalledWith(id);
    expect(mockCharityRepository.update).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(updatedCharity);
  });

  it('should return null when charity is not found', async () => {
    // Arrange
    const id = 999;
    const updateData = {
      name: 'Updated Charity',
    };

    mockCharityRepository.findById.mockResolvedValue(null);

    // Act
    const result = await updateCharityUseCase.execute(id, updateData);

    // Assert
    expect(mockCharityRepository.findById).toHaveBeenCalledWith(id);
    expect(mockCharityRepository.update).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should handle repository errors', async () => {
    // Arrange
    const id = 1;
    const updateData = {
      name: 'Updated Charity',
    };

    const error = new Error('Repository error');
    mockCharityRepository.findById.mockRejectedValue(error);

    // Act & Assert
    await expect(updateCharityUseCase.execute(id, updateData)).rejects.toThrow('Repository error');
  });
});
