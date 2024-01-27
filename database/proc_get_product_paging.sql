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

