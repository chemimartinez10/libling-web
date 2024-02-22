/*
  Warnings:

  - You are about to drop the column `rooms` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "rooms",
ADD COLUMN     "bathrooms" DECIMAL(65,30),
ADD COLUMN     "bedrooms" DECIMAL(65,30);
