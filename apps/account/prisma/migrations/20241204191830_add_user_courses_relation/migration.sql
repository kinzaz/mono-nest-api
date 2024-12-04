-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Teacher', 'Student');

-- CreateEnum
CREATE TYPE "PurchaseState" AS ENUM ('Started', 'WaitingForPayment', 'Purchased', 'Canceled');

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'Student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourseModel" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "purchaseState" "PurchaseState" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserCourseModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- AddForeignKey
ALTER TABLE "UserCourseModel" ADD CONSTRAINT "UserCourseModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
