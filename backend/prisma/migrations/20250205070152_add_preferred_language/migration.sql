-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_id_fkey";

-- AlterTable
CREATE SEQUENCE user_profile_id_seq;
ALTER TABLE "user_profile" ALTER COLUMN "id" SET DEFAULT nextval('user_profile_id_seq');
ALTER SEQUENCE user_profile_id_seq OWNED BY "user_profile"."id";

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
