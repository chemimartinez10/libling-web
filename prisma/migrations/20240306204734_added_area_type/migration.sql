/*
  Warnings:

  - Added the required column `areaId` to the `Surface` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Surface" ADD COLUMN     "areaId" INTEGER NOT NULL;
