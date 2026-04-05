import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

// CREATE USER 
export const createUser = async (data: any) => {
  const { name, email, password, role } = data;

  // 🔍 Validation
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 🔐 Role validation
  let userRole: Role = Role.VIEWER;

  if (role) {
    if (!Object.values(Role).includes(role)) {
      throw new Error("Invalid role");
    }
    userRole = role;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
      status: "ACTIVE",
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

// DEACTIVATE USER
export const deactivateUser = async (
  userId: string,
  currentUserId: string
) => {
  if (userId === currentUserId) {
    throw new Error("Admin cannot deactivate themselves");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === "INACTIVE") {
    throw new Error("User already inactive");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status: "INACTIVE" },
  });

  return updatedUser;
};