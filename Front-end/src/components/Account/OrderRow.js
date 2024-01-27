import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { ORDERS_API as ordersApi } from "../../keys/BackEndKeys";
import { fontGrid } from "@mui/material/styles/cssUtils";

export default function OrderRow({ anOrder, count }) {
    const { sendRequest } = useHttpClient();
    const [details, setDetails] = useState([]);
    const [orderInfo, setOrderInfo] = useState({
        orderDate: "",
        price: ""
    })
    const totalOrigin = anOrder.Total;
    useEffect(() => {
        async function fetchDetail() {
            const apiGetDetail = `${ordersApi}/${anOrder.OrderID}/getdetail`;
            try {
                const data = await sendRequest(
                    apiGetDetail,
                    "GET",
                    {
                        "Content-type": "application/json"
                    }
                );
                setDetails(data.detail);
                //console.log("Detail in order row", data.detail);
            } catch (err) {
                console.log("error in order row", err);
            }
        }
        fetchDetail();

        const tempDate = anOrder.OrderDate;
        const date = tempDate.substring(0, 10);
        const tempPrice = parseInt(anOrder.Price);
        const price = formatWithDot(tempPrice);

        setOrderInfo({
            orderDate: date,
            price: price
        });

    }, [anOrder.OrderID]);

    function formatWithDot(n) {
        return n.toString ().replace (/B (?= (d {3})+b)/g, ".");
      }
    return (
        <>
            <tr>
                <td>{count}</td>
                <td>{anOrder.OrderDate}</td>
                <td>{anOrder.Address} {anOrder.Phone}</td>
                <td>
                    {details.length > 0 && details.map(detail => {
                        const productName = detail.ProductName;
                        const priceString = detail.Price;
                        const price = priceString.substring(0, priceString.indexOf("."));
                        const quantity = detail.Quantity;
                        return `${productName}: ${price} x ${quantity}; `;
                    })}
                </td>
                <td>{totalOrigin.substring(0, totalOrigin.indexOf("."))}</td>
            </tr>
        </>
    );
}