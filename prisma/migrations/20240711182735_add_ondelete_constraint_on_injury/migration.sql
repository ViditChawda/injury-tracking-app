-- DropForeignKey
ALTER TABLE "Injury" DROP CONSTRAINT "Injury_report_id_fkey";

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
