/*
  Warnings:

  - You are about to drop the column `answers` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable

ALTER TABLE "questions" RENAME COLUMN "answers" TO "choices";
