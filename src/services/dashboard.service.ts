import prisma from "../prisma/client";

// SUMMARY 
export const getSummary = async () => {
  const income = await prisma.record.aggregate({
    where: { type: "INCOME" },
    _sum: { amount: true },
  });

  const expense = await prisma.record.aggregate({
    where: { type: "EXPENSE" },
    _sum: { amount: true },
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

// FILTERED DATA
export const getFilteredData = async (filters: any) => {
  const { type, category } = filters;

  const where: any = {};

  if (type) {
    where.type = type;
  }

  if (category) {
    where.category = category;
  }

  const records = await prisma.record.findMany({
    where,
    orderBy: { date: "desc" },
  });

  const total = records.reduce((sum, r) => sum + r.amount, 0);

  return {
    total,
    count: records.length,
    records,
  };
};

// CATEGORY TOTALS 
export const getCategoryTotals = async () => {
  const data = await prisma.record.groupBy({
    by: ["category"],
    _sum: { amount: true },
  });

  return data.map((item) => ({
    category: item.category,
    total: item._sum.amount || 0,
  }));
};

// RECENT RECORDS
export const getRecentRecords = async (role: string) => {
  const limit = role === "VIEWER" ? 5 : 20;

  return prisma.record.findMany({
    orderBy: { date: "desc" },
    take: limit,
  });
};

// TRENDS (Monthly)
export const getTrends = async () => {
  const records = await prisma.record.findMany({
    orderBy: { date: "asc" },
  });

  const trends: any = {};

  records.forEach((r) => {
    const month = r.date.toISOString().slice(0, 7);

    if (!trends[month]) {
      trends[month] = { income: 0, expense: 0 };
    }

    if (r.type === "INCOME") {
      trends[month].income += r.amount;
    } else {
      trends[month].expense += r.amount;
    }
  });

  return Object.entries(trends).map(([month, value]: any) => ({
    month,
    ...value,
  }));
};

// FULL DASHBOARD
export const getDashboard = async (role: string) => {
  const summary = await getSummary();

  let recent: any[] = [];
  let categories: any[] = [];
  let trends: any[] = [];

  if (role === "ANALYST" || role === "ADMIN") {
    recent = await getRecentRecords(role);
  }

  if (role === "ANALYST" || role === "ADMIN") {
    categories = await getCategoryTotals();
    trends = await getTrends();
  }

  return {
    ...summary,
    categoryTotals: categories,
    recentRecords: recent,
    trends,
  };
};