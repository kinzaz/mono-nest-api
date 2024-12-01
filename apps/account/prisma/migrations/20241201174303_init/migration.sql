-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Teacher', 'Student');

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'Student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);
