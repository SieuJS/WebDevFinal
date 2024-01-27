DROP TABLE IF EXISTS "Account";
CREATE TABLE "Account" (
  	"AccID" serial NOT NULL,
  	"ShopID" varchar(50),
	"Balance" int8
)
;
ALTER TABLE "Account" ADD PRIMARY KEY ("AccID");

BEGIN;
INSERT INTO "Account" VALUES (DEFAULT, NULL, 0);
COMMIT;

DROP TABLE IF EXISTS "Transaction";
CREATE TABLE "Transaction" (
  	"TransID" serial NOT NULL,
	"AccID" int4,
  	"Amount" int4,
	"OrderID" int4,
	"Status" varchar(50),
	"Balance" int8,
	"Date" timestamp without time zone,
	CONSTRAINT FK_Account
		FOREIGN KEY ("AccID")
			REFERENCES "Account"("AccID")
)
;
ALTER TABLE "Transaction" ADD PRIMARY KEY ("TransID");

CREATE OR REPLACE PROCEDURE create_account(
    IN p_shop_id varchar(50),
    IN p_balance int8
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO "Account" ("ShopID", "Balance")
    VALUES (p_shop_id, p_balance);
END;
$$;

-- CALL create_account('123456',3000000000)