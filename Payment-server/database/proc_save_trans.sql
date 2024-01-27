CREATE OR REPLACE PROCEDURE proc_save_trans(
    sender_id INT, -- ID người gửi
    receiver_id INT, -- ID người nhận
    order_id INT,
    amount BIGINT -- Số tiền gửi
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Khai báo biến
    sta_string VARCHAR(50);
    sender_balance BIGINT;
    receiver_balance BIGINT;
BEGIN
    -- Tìm số dư tài khoản gửi
    SELECT "Balance" INTO sender_balance FROM "Account" WHERE "AccID" = sender_id;
    -- Tìm số dư tài khoản nhận
    SELECT "Balance" INTO receiver_balance FROM "Account" WHERE "AccID" = receiver_id;
    -- Ghi log giao dịch
    INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Balance", "Date")
    VALUES (sender_id, -amount, order_id, 'fail', sender_balance, CURRENT_TIMESTAMP);

    INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Balance", "Date")
    VALUES (receiver_id, amount, order_id, 'fail' , receiver_balance, CURRENT_TIMESTAMP);
END;
$$;