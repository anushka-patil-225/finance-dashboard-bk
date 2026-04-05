import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  createRecord as createRecordService,
  getRecords as getRecordsService,
  updateRecord as updateRecordService,
  deleteRecord as deleteRecordService,
  getRecordById as getRecordByIdService,
} from "../services/record.service";

// CREATE
export const createRecord: RequestHandler = async (req: any, res, next) => {
  try {
    const record = await createRecordService(
      req.body,
      req.user.userId
    );
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

// GET
export const getRecords: RequestHandler = async (req: any, res, next) => {
  try {
    const result = await getRecordsService(
      req.query,
      req.user.userId
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getRecordById: RequestHandler = async (req: any, res, next) => {
  try {
    const record = await getRecordByIdService(
      req.params.id,
      req.user.userId
    );
    res.json(record);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateRecord: RequestHandler = async (req: any, res, next) => {
  try {
    const record = await updateRecordService(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.json(record);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteRecord: RequestHandler = async (req: any, res, next) => {
  try {
    await deleteRecordService(
      req.params.id,
      req.user.userId
    );
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};