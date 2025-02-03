-- CreateEnum
CREATE TYPE "ThemeEnum" AS ENUM ('LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "user_data" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" INTEGER NOT NULL,
    "theme" "ThemeEnum" NOT NULL DEFAULT 'LIGHT',
    "username" TEXT NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_data_username_key" ON "user_data"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_username_key" ON "user_profile"("username");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
