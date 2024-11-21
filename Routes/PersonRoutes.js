// src/routes/personRoutes.js
import express from 'express';
import { authenticate, isAdmin } from '../Middleware/auth.js';
import { apiLimiter } from '../Middleware/ratelimiter.js';
import { upload } from '../Middleware/upload.js';
import { validatePerson, validate } from '../Middleware/validate.js';
import {
  addPerson,
  updatePerson,
  deletePerson,
  getPerson,
  getAllPeople
} from '../Controller/Person.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: People
 *   description: Person management (Director , Actors and cast Management)
 */

/**
 * @swagger
 * /api/people:
 *   post:
 *     summary: Create a new person
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: The person was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/', authenticate, isAdmin, upload.single('photo'), addPerson);

/**
 * @swagger
 * /api/people/{id}:
 *   put:
 *     summary: Update a person
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: The person was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Person not found
 */
router.put('/:id', authenticate, isAdmin, upload.single('photo'), validatePerson, validate, updatePerson);

/**
 * @swagger
 * /api/people/{id}:
 *   delete:
 *     summary: Delete a person
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The person was successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Person not found
 */
router.delete('/:id', authenticate, isAdmin, deletePerson);

/**
 * @swagger
 * /api/people/{id}:
 *   get:
 *     summary: Get a person by id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Person not found
 */
router.get('/:id', getPerson);

/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Get all people
 *     tags: [People]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of people
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 people:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Person'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalPeople:
 *                   type: integer
 */
router.get('/', getAllPeople);

// Apply rate limiter to all routes
router.use(apiLimiter);

export default router;