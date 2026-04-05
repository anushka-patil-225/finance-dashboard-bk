import prisma from "../prisma/client";

// CREATE
export const createRecord = async (data: any, userId: string) => {
  const amount =
    typeof data.amount === "string" ? parseFloat(data.amount) : data.amount;

  if (isNaN(amount)) throw new Error("Invalid amount");

  const date = new Date(data.date);
  if (isNaN(date.getTime())) throw new Error("Invalid date format");

  return prisma.record.create({
    data: {
      amount,
      type: data.type,
      category: data.category,
      date,
      notes: data.notes,
      userId,
    },
  });
};

// GET
export const getRecords = async (filters: any, userId: string) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {
    userId,
    ...(filters.type && { type: filters.type }),
    ...(filters.category && { category: filters.category }),
    ...(filters.startDate &&
      filters.endDate && {
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      }),
  };

  const [records, total] = await Promise.all([
    prisma.record.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take: limit,
    }),
    prisma.record.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    data: records,
  };
};

// GET BY ID
export const getRecordById = async (id: string, userId: string) => {
  const record = await prisma.record.findUnique({ where: { id } });

  if (!record) throw new Error("Record not found");

  if (record.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  return record;
};

// UPDATE
export const updateRecord = async (
  id: string,
  data: any,
  userId: string
) => {
  const existing = await prisma.record.findUnique({ where: { id } });

  if (!existing) throw new Error("Record not found");

  if (existing.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const updatedData: any = { ...data };

  if (data.amount) {
    const amount =
      typeof data.amount === "string"
        ? parseFloat(data.amount)
        : data.amount;

    if (isNaN(amount)) throw new Error("Invalid amount");
    updatedData.amount = amount;
  }

  if (data.date) {
    const date = new Date(data.date);
    if (isNaN(date.getTime())) throw new Error("Invalid date format");
    updatedData.date = date;
  }

  return prisma.record.update({
    where: { id },
    data: updatedData,
  });
};

// DELETE
export const deleteRecord = async (id: string, userId: string) => {
  const record = await prisma.record.findUnique({ where: { id } });

  if (!record) throw new Error("Record not found");

  if (record.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.record.delete({
    where: { id },
  });
};