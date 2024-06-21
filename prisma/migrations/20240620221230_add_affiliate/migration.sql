-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Student', 'JobSeeker', 'Business');

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "plan_date" TIMESTAMP(3) NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pay" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "reference" TEXT,
    "months" INTEGER NOT NULL DEFAULT 1,
    "quantity" DECIMAL(65,30),
    "status" BOOLEAN NOT NULL,
    "affiliateId" INTEGER NOT NULL,

    CONSTRAINT "Pay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_email_key" ON "Affiliate"("email");

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pay" ADD CONSTRAINT "Pay_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
