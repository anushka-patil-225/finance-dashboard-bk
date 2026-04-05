import { Router } from "express";
import * as recordController from "../controllers/record.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial records management (ADMIN only)
 */

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a financial record (ADMIN only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *           example:
 *             amount: 500
 *             type: EXPENSE
 *             category: food
 *             date: 2026-04-02
 *             notes: Lunch
 *     responses:
 *       201:
 *         description: Record created
 */
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  recordController.createRecord
);
/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records (ADMIN only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/", authenticate, authorizeRoles("ADMIN"), recordController.getRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get a record by ID (ADMIN only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record fetched successfully
 *       404:
 *         description: Record not found
 */
router.get("/:id", authenticate, authorizeRoles("ADMIN"), recordController.getRecordById);

/**
 * @swagger
 * /records/{id}:
 *   patch:
 *     summary: Update a record (ADMIN only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *           example:
 *             amount: 600
 *             category: groceries
 *             date: 2026-04-03
 *             notes: Updated lunch
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), recordController.updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete a record (ADMIN only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), recordController.deleteRecord);

export default router;