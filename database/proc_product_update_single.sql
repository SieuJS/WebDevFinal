CREATE OR REPLACE PROCEDURE proc_update_product(
    proID INTEGER,
    newName TEXT DEFAULT NULL,
    newTinyDes TEXT DEFAULT NULL,
	newFullDes TEXT DEFAULT NULL,
	newPrice INTEGER DEFAULT NULL,
	newCatID INTEGER DEFAULT NULL,
	newQuantity INTEGER DEFAULT NULL
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
		"Quantity" = COALESCE(newQuantity, "Quantity")
    WHERE
        "ProID" = proID;
END;
$$;

CALL proc_update_product(2,'New Product name',NULL,NULL,NULL,NULL, 999);