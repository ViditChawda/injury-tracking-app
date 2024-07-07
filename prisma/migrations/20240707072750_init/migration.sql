-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reporter" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
