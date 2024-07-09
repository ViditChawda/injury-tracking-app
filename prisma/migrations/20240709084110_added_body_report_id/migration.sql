-- CreateTable
CREATE TABLE "Injury" (
    "injury_id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "body_part_id" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Injury_pkey" PRIMARY KEY ("injury_id")
);

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
