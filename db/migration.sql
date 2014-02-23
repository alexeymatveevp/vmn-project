-- For example, suppose you have a table named "t1" with columns names "a", "b", and "c" and that you want to delete column "c" from this table. The following steps illustrate how this could be done:
BEGIN TRANSACTION;
CREATE TEMPORARY TABLE temp(id,question);
INSERT INTO temp SELECT id,question FROM question;
DROP TABLE question;
CREATE TABLE "question" (
  "id" integer NOT NULL PRIMARY KEY,
  "question" varchar(200) NOT NULL,
  "milestone" varchar(40) NOT NULL,
  foreign key (milestone) references "milestone" ("name")
);
INSERT INTO question SELECT id,question FROM temp;
DROP TABLE temp;
COMMIT;