-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_quarterOfferedId_fkey";

-- CreateTable
CREATE TABLE "_ProfessorToQuarterOffered" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorToQuarterOffered_AB_unique" ON "_ProfessorToQuarterOffered"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorToQuarterOffered_B_index" ON "_ProfessorToQuarterOffered"("B");

-- AddForeignKey
ALTER TABLE "_ProfessorToQuarterOffered" ADD CONSTRAINT "_ProfessorToQuarterOffered_A_fkey" FOREIGN KEY ("A") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorToQuarterOffered" ADD CONSTRAINT "_ProfessorToQuarterOffered_B_fkey" FOREIGN KEY ("B") REFERENCES "QuarterOffered"("id") ON DELETE CASCADE ON UPDATE CASCADE;
