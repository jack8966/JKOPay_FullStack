import { Request, Response } from 'express';
import { ListCharitiesUseCase } from '../../application/use-cases/charity/ListCharitiesUseCase';
import { CharityRepository } from '../../infrastructure/repositories/CharityRepository';
import { CharityQueryParams } from '../../domain/repositories/ICharityRepository';
import logger from '../../utils/logger';

export class CharityController {
  private listCharitiesUseCase: ListCharitiesUseCase;

  constructor() {
    const charityRepository = new CharityRepository();
    this.listCharitiesUseCase = new ListCharitiesUseCase(charityRepository);
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
}
