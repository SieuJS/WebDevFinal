CREATE OR REPLACE PROCEDURE proc_transaction(
    sender_id INT,
    receiver_id INT,
	order_id INT,
    amount BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    sender_balance BIGINT;
    receiver_balance BIGINT;
BEGIN
    -- Bắt đầu thực hiện các thay đổi trong giao dịch
	BEGIN
		-- Tìm số dư tài khoản nguồn
        SELECT "Balance" INTO sender_balance FROM "Account" WHERE "AccID" = sender_id;
		
		IF sender_balance < amount THEN
            RAISE EXCEPTION 'The balance is not enough to make the transaction';
        END IF;
		
		-- Trừ số dư của người gửi
		UPDATE "Account" SET "Balance" = "Balance" - amount WHERE "AccID" = sender_id RETURNING "Balance" INTO sender_balance;
		
		-- Kiểm tra xem có cập nhật không
		IF NOT FOUND THEN
			RAISE EXCEPTION 'Balance does not update. Transfer failed.';
		END IF;

		-- Cộng số dư cho người nhận
		UPDATE "Account" SET "Balance" = "Balance" + amount WHERE "AccID" = receiver_id RETURNING "Balance" INTO receiver_balance;
		
		-- Kiểm tra xem có cập nhật không
		IF NOT FOUND THEN
			RAISE EXCEPTION 'Balance does not update. Transfer failed.';
		END IF;
		
		-- Ghi log giao dịch
		INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Balance", "Date")
		VALUES (sender_id, -amount, order_id, 'success', sender_balance, CURRENT_TIMESTAMP);

		INSERT INTO "Transaction" ("AccID", "Amount", "OrderID", "Status", "Balance", "Date")
		VALUES (receiver_id, amount, order_id, 'success' , receiver_balance, CURRENT_TIMESTAMP);
		
	EXCEPTION
        WHEN others THEN
            -- Nếu có lỗi, hủy bỏ giao dịch
            ROLLBACK;
            RAISE EXCEPTION 'Transfer failed. Please try again.';
    END;
	COMMIT;
END;
$$;