import { RequestHandler } from "express";
import {
  deactivateUser,
  createUser,
} from "../services/user.service";

// CREATE USER 
export const addUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE USER 
export const deleteUser: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.userId;

    const user = await deactivateUser(id, currentUserId);

    res.json({
      message: "User deactivated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};