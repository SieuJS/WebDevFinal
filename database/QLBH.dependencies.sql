-- Tạo hàm trigger
CREATE OR REPLACE FUNCTION update_product_quantity()
RETURNS TRIGGER AS $$
BEGIN
  -- Giảm giá trị quantity trong bảng Products tương ứng với proid từ bảng OrderDetails
  UPDATE "Products"
  SET "Quantity" = "Quantity" - NEW."Quantity"
  WHERE "ProID" = NEW."ProID";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger cho sự kiện INSERT trên bảng OrderDetails
CREATE TRIGGER order_details_insert_trigger
AFTER INSERT ON "OrderDetails"
FOR EACH ROW
EXECUTE FUNCTION update_product_quantity();


-- FUNCTION: public.get_list_users(integer, integer)

-- DROP FUNCTION IF EXISTS public.get_list_users(integer, integer);

CREATE OR REPLACE FUNCTION public.get_list_users(
	page_size integer,
	page_num integer)
	RETURNS Table ("ID" int, "Username"  varchar, "Name" varchar , "Email" varchar , "DOB" timestamp , "Role" char, "Permission" int)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
	
BEGIN
    -- Your logic to fetch data based on page_size and page_num goes here
    -- This is just a placeholder, replace it with your actual query
    RETURN QUERY 
	SELECT u."ID" , u."Username" , u."Name",u."Email", u."DOB",  u."Role", u."Permission"
    FROM "Users" u
    LIMIT page_size
    OFFSET (page_num - 1) * page_size;
END;
$BODY$;

ALTER FUNCTION public.get_list_users(integer, integer)
    OWNER TO postgres;

-- FUNCTION: public.update_user(integer, text, text, text, text, text)

-- DROP FUNCTION IF EXISTS public.update_user(integer, text, text, text, text, text);

CREATE OR REPLACE FUNCTION public.update_user(
	user_id integer,
	newusername text DEFAULT NULL::text,
	newpassword text DEFAULT NULL::text,
	newname text DEFAULT NULL::text,
	newemail text DEFAULT NULL::text,
	newdob text DEFAULT NULL::text)
    RETURNS TABLE(id integer, username character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    UPDATE "Users"
	SET
        "Username" = COALESCE(newUsername,  "Username"),
        "Password" = COALESCE(newPassword, "Password"),
        "Name" = COALESCE(newName, "Name"),
        "Email" = COALESCE(newEmail, "Email"),
		"DOB" = COALESCE(TO_DATE(newDOB,'YYYY-MM-DD'), "DOB")
    WHERE "ID" = user_id;
	RETURN QUERY SELECT "ID", "Username" FROM "Users" WHERE "ID" = user_id;
END;
$BODY$;

ALTER FUNCTION public.update_user(integer, text, text, text, text, text)
    OWNER TO postgres;

-- PROCEDURE: public.proc_delete_product(integer)

-- DROP PROCEDURE IF EXISTS public.proc_delete_product(integer);

CREATE OR REPLACE PROCEDURE public.proc_delete_product(
	IN p_id integer)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	DELETE FROM "Products" WHERE "ProID" = p_id;
END;
$BODY$;
ALTER PROCEDURE public.proc_delete_product(integer)
    OWNER TO postgres;

CREATE OR REPLACE PROCEDURE proc_delete_user(
	IN username TEXT)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	DELETE FROM "Users" WHERE "Username" = username;
	DELETE FROM "Orders" WHERE "UserID" = (
		SELECT "ID" FROM "Users"
		WHERE "Username" = username);
END;
$BODY$;
ALTER PROCEDURE public.proc_delete_product(integer)
    OWNER TO postgres;

CREATE OR REPLACE FUNCTION get_page_data(
    IN page_number INT,
    IN page_size INT
) RETURNS TABLE (pid INT, pname VARCHAR(255))
AS $function$
DECLARE
    
	ofs INT;
BEGIN
    -- Calculate OFFSET for paging
    ofs := (page_number - 1) * page_size;

    -- Return the paginated result set
    RETURN QUERY
    SELECT "ProID", "ProName"
    FROM "Products"
    ORDER BY "ProID"
    LIMIT page_size
    OFFSET ofs;

END;
$function$ LANGUAGE plpgsql;

-- Call the function to get the first page with a page size of 3


CREATE OR REPLACE PROCEDURE proc_update_product(
    proID INTEGER,
    newName TEXT DEFAULT NULL,
    newTinyDes TEXT DEFAULT NULL,
	newFullDes TEXT DEFAULT NULL,
	newPrice INTEGER DEFAULT NULL,
	newCatID INTEGER DEFAULT NULL,
	newQuantity INTEGER DEFAULT NULL,
    newImage TEXT DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "Products"
    SET
        "ProName" = COALESCE(newName, "ProName"),
		"TinyDes" = COALESCE(newTinyDes, "TinyDes"),
		"FullDes" = COALESCE(newFullDes, "FullDes"),
        "Price" = COALESCE(newPrice, "Price"),
		"CatID" = COALESCE(newCatID, "CatID"),
		"Quantity" = COALESCE(newQuantity, "Quantity"),
        "Image" = COALESCE(newImage, "Image")
    WHERE
        "ProID" = proID;
END;
$$;

