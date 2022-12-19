-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "qusers"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
