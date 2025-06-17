import { Router } from 'express';
import { CharityController } from '../controllers/CharityController';
import { CharityRepository } from '../../infrastructure/repositories/CharityRepository';

const router = Router();
const charityRepository = new CharityRepository();
const charityController = new CharityController(charityRepository);

/**
 * @swagger
 * /api/charities:
 *   get:
 *     summary: Get all charities with pagination
 *     tags: [Charities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by charity name
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, createdAt, updatedAt]
 *         description: Field to order by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Order direction
 *     responses:
 *       200:
 *         description: List of charities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 charities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Charity'
 *                 total:
 *                   type: integer
 *                   description: Total number of charities
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', (req, res) => charityController.listCharities(req, res));

/**
 * @swagger
 * /api/charities:
 *   post:
 *     summary: Create a new charity
 *     tags: [Charities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Charity'
 *     responses:
 *       201:
 *         description: Charity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Charity'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => charityController.create(req, res));

/**
 * @swagger
 * /api/charities/{id}:
 *   put:
 *     summary: Update a charity
 *     tags: [Charities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Charity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Charity'
 *     responses:
 *       200:
 *         description: Charity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Charity'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Charity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', (req, res) => charityController.update(req, res));

/**
 * @swagger
 * /api/charities/{id}:
 *   delete:
 *     summary: Soft delete a charity
 *     tags: [Charities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Charity ID
 *     responses:
 *       204:
 *         description: Charity deleted successfully
 *       404:
 *         description: Charity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', (req, res) => charityController.delete(req, res));

/**
 * @swagger
 * /api/charities/batch/find:
 *   post:
 *     summary: Find charities by IDs
 *     tags: [Charities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - ids
 *     responses:
 *       200:
 *         description: List of charities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Charity'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/batch/find', (req, res) => charityController.findByIds(req, res));

/**
 * @swagger
 * /api/charities/batch/create:
 *   post:
 *     summary: Create multiple charities
 *     tags: [Charities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Charity'
 *     responses:
 *       201:
 *         description: Charities created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Charity'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/batch/create', (req, res) => charityController.createMany(req, res));

/**
 * @swagger
 * /api/charities/batch/update:
 *   put:
 *     summary: Update multiple charities
 *     tags: [Charities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Charity'
 *               required:
 *                 - id
 *                 - data
 *     responses:
 *       200:
 *         description: Charities updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Charity'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/batch/update', (req, res) => charityController.updateMany(req, res));

/**
 * @swagger
 * /api/charities/batch/delete:
 *   delete:
 *     summary: Soft delete multiple charities
 *     tags: [Charities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - ids
 *     responses:
 *       204:
 *         description: Charities deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/batch/delete', (req, res) => charityController.deleteMany(req, res));

export default router;
