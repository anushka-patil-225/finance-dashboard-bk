import { RequestHandler } from "express";
import {
  getSummary,
  getFilteredData,
  getCategoryTotals,
  getRecentRecords,
  getTrends,
  getDashboard,
} from "../services/dashboard.service";

// SUMMARY
export const summary: RequestHandler = async (req, res, next) => {
  try {
    const data = await getSummary();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// FILTER
export const filterData: RequestHandler = async (req: any, res, next) => {
  try {
    const { type, category } = req.query;
    const data = await getFilteredData({ type, category });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// CATEGORIES
export const categories: RequestHandler = async (req, res, next) => {
  try {
    const data = await getCategoryTotals();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// RECENT
export const recent: RequestHandler = async (req: any, res, next) => {
  try {
    const data = await getRecentRecords(req.user.role);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// TRENDS
export const trends: RequestHandler = async (req, res, next) => {
  try {
    const data = await getTrends();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DASHBOARD
export const dashboard: RequestHandler = async (req: any, res, next) => {
  try {
    const data = await getDashboard(req.user.role);
    res.json(data);
  } catch (err) {
    next(err);
  }
};