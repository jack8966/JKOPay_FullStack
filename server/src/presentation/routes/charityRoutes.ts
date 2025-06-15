import { Router } from 'express';
import { CharityController } from '../controllers/CharityController';

const router = Router();
const charityController = new CharityController();

router.get('/', charityController.listCharities.bind(charityController));

export default router;
