-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "units" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuarterOffered" (
    "id" SERIAL NOT NULL,
    "quarter" TEXT NOT NULL,
    "courseId" INTEGER,

    CONSTRAINT "QuarterOffered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "rating" DOUBLE PRECISION,
    "wouldRepeat" DOUBLE PRECISION,
    "difficulty" DOUBLE PRECISION,
    "comments" TEXT[],
    "quarterOfferedId" INTEGER,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_name_key" ON "Professor"("name");

-- AddForeignKey
ALTER TABLE "QuarterOffered" ADD CONSTRAINT "QuarterOffered_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_quarterOfferedId_fkey" FOREIGN KEY ("quarterOfferedId") REFERENCES "QuarterOffered"("id") ON DELETE SET NULL ON UPDATE CASCADE;
