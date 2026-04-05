import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Test
 *             email: Test@test.com
 *             password: passoword
 *             role: ADMIN
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: test@test.com
 *             password: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *               token: <JWT_TOKEN>
 *               user:
 *                 id: "123"
 *                 email: "rahul@test.com"
 *                 role: "ADMIN"
 */
router.post("/login", authController.login);

export default router;