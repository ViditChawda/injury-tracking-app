/*
  Warnings:

  - You are about to drop the column `reporter` on the `Report` table. All the data in the column will be lost.
  - Added the required column `report_name` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporter_name` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reporter",
ADD COLUMN     "report_name" TEXT NOT NULL,
ADD COLUMN     "reporter_name" TEXT NOT NULL;
