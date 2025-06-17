import { Request, Response } from 'express';
import { ListCharitiesUseCase } from '../../application/use-cases/charity/ListCharitiesUseCase';
import { CharityRepository } from '../../infrastructure/repositories/CharityRepository';
import { CharityQueryParams } from '../../domain/repositories/ICharityRepository';
import logger from '../../utils/logger';
import { CreateCharityUseCase } from '../../application/use-cases/charity/CreateCharityUseCase';
import { UpdateCharityUseCase } from '../../application/use-cases/charity/UpdateCharityUseCase';
import { DeleteCharityUseCase } from '../../application/use-cases/charity/DeleteCharityUseCase';
import { BatchCharityUseCase } from '../../application/use-cases/charity/BatchCharityUseCase';
import { ICharityRepository } from '../../domain/repositories/ICharityRepository';

export class CharityController {
  private listCharitiesUseCase: ListCharitiesUseCase;
  private createCharityUseCase: CreateCharityUseCase;
  private updateCharityUseCase: UpdateCharityUseCase;
  private deleteCharityUseCase: DeleteCharityUseCase;
  private batchCharityUseCase: BatchCharityUseCase;

  constructor(private charityRepository: ICharityRepository) {
    this.listCharitiesUseCase = new ListCharitiesUseCase(new CharityRepository());
    this.createCharityUseCase = new CreateCharityUseCase(charityRepository);
    this.updateCharityUseCase = new UpdateCharityUseCase(charityRepository);
    this.deleteCharityUseCase = new DeleteCharityUseCase(charityRepository);
    this.batchCharityUseCase = new BatchCharityUseCase(charityRepository);
  }

  async listCharities(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const queryParams: CharityQueryParams = {};
      if (req.query.name) {
        queryParams.name = req.query.name as string;
      }

      if (req.query.order) {
        queryParams.order = req.query.order as 'ASC' | 'DESC';
      }

      if (req.query.orderBy) {
        queryParams.orderBy = req.query.orderBy as 'name' | 'createdAt' | 'updatedAt';
      }

      const result = await this.listCharitiesUseCase.execute({
        page,
        limit,
        queryParams,
      });

      res.json(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const charity = await this.createCharityUseCase.execute(req.body);
      res.status(201).json(charity);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const charity = await this.updateCharityUseCase.execute(id, req.body);
      if (!charity) {
        res.status(404).json({ error: 'Charity not found' });
        return;
      }
      res.json(charity);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.deleteCharityUseCase.execute(id);
      if (!success) {
        res.status(404).json({ error: 'Charity not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Batch operations
  async findByIds(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        res.status(400).json({ error: 'ids must be an array' });
        return;
      }
      const charities = await this.batchCharityUseCase.findByIds(ids);
      res.json(charities);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async createMany(req: Request, res: Response): Promise<void> {
    try {
      const charities = await this.batchCharityUseCase.createMany(req.body);
      res.status(201).json(charities);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateMany(req: Request, res: Response): Promise<void> {
    try {
      const charities = await this.batchCharityUseCase.updateMany(req.body);
      res.json(charities);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteMany(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        res.status(400).json({ error: 'ids must be an array' });
        return;
      }
      const success = await this.batchCharityUseCase.deleteMany(ids);
      if (!success) {
        res.status(404).json({ error: 'No charities found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
