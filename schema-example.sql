-- Users
-- - user_id        auto integer
-- - regtime        datetime
-- - username       varchar
-- - useremail      varchar
-- - userpass       varchar

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR,
  "last_name" VARCHAR,
  "email" VARCHAR,
  "password" VARCHAR,
  "last_login" TIMESTAMP,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

INSERT INTO "users" (first_name, last_name, created_at) VALUES ('john', 'smith', now());


CREATE TABLE "quizzes" (
  "id" SERIAL PRIMARY KEY,
  "quiz_id" VARCHAR, -- nanoid
--   "question_id" INTEGER, -- related to questions.question_id
  "title" VARCHAR,
  "description" VARCHAR,
  "is_active" BOOLEAN,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

INSERT INTO "quizzes" (title, description, is_active, created_at)
VALUES ('Colors of things', 'A quiz all about colors', true, now());



CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" VARCHAR,
  "question" VARCHAR,
  "is_active" BOOLEAN,
  "score" INTEGER,
  "answers" JSONB,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

INSERT INTO "questions" (question, is_active, score, answers, created_at)
VALUES ('What is the color of the ocean?', true, 20, '[{ "correct": true, "answer": "blue" }, { "correct": false, "answer": "red" }, { "correct": false, "answer": "green" }, { "correct": false, "answer": "purple" }]', now());

INSERT INTO "questions" (question, is_active, score, answers, created_at)
VALUES ('What color is a #2 pencil?', true, 20, '[{ "correct": false, "answer": "blue" }, { "correct": true, "answer": "yellow" }, { "correct": false, "answer": "green" }, { "correct": false, "answer": "purple" }]', now());


CREATE TABLE "question_quiz" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INTEGER,
  "quiz_id" INTEGER
);


INSERT INTO "question_quiz" (question_id, quiz_id) VALUES (1, 1);
INSERT INTO "question_quiz" (question_id, quiz_id) VALUES (2, 1);



-- model User {
--     user_id    String @id @default(cuid())
--     first_name String
--     last_name  String
--     email      String  @unique
--     password   String?
--     created_at  DateTime @default(now())
-- }

-- Questions
-- - question_id    auto integer
-- - question       varchar
-- - is_active      enum(0,1)

-- Question_choices
-- - choice_id        auto integer
-- - question_id      Questions.question_id
-- - is_right_choice  enum(0,1)
-- - choice           varchar

-- User_question_answers
-- - user_id        Users.user_id
-- - question_id    Questions.question_id
-- - choice_id      Question_choices.choice.id
-- - is_right       enum(0,1)
-- - answer_time    datetime