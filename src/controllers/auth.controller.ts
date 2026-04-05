import * as authService from "../services/auth.service";
import { RequestHandler } from "express";

// REGISTER
export const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.login(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};