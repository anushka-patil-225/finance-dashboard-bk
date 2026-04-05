import { Router } from "express";
import {
  summary,
  categories,
  recent,
  trends,
  dashboard,
  filterData
} from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Company-wide financial dashboard APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Summary:
 *       type: object
 *       properties:
 *         totalIncome:
 *           type: number
 *         totalExpense:
 *           type: number
 *         netBalance:
 *           type: number
 *
 *     Category:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *         total:
 *           type: number
 *
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         amount:
 *           type: number
 *         type:
 *           type: string
 *         category:
 *           type: string
 *         date:
 *           type: string
 *
 *     Trend:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *         income:
 *           type: number
 *         expense:
 *           type: number
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get full dashboard (role-based response)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/", authenticate, authorizeRoles("VIEWER", "ANALYST", "ADMIN"), dashboard);

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary (global)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 */
router.get("/summary", authenticate, authorizeRoles("VIEWER", "ANALYST", "ADMIN"), summary);

/**
 * @swagger
 * /dashboard/filter:
 *   get:
 *     summary: Get filtered financial data (by type and category)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         description: Filter by record type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Filtered records
 */
router.get("/filter", authenticate, authorizeRoles("ANALYST", "ADMIN"), filterData);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Get category totals (Analyst/Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown
 *       403:
 *         description: Forbidden
 */
router.get("/categories", authenticate, authorizeRoles("ANALYST", "ADMIN"), categories);

/**
 * @swagger
 * /dashboard/recent:
 *   get:
 *     summary: Get recent records (Viewer limited to 5)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions
 */
router.get("/recent", authenticate, authorizeRoles("ANALYST", "ADMIN"), recent);

/**
 * @swagger
 * /dashboard/trends:
 *   get:
 *     summary: Get monthly trends (Analyst/Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends
 *       403:
 *         description: Forbidden
 */
router.get("/trends", authenticate, authorizeRoles("ANALYST", "ADMIN"), trends);

export default router;