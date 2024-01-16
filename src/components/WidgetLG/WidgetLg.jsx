import React, { useEffect, useState } from "react";
import "./widgetLg.css";
import { userRequest } from "../../requestMethods";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";

const WidgetLg = () => {
    const [orders, setOrders] = useState([]);
    const timeAgo = new TimeAgo.addDefaultLocale(fr);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("orders");
                setOrders(res.data);
            } catch { }
        };
        getOrders();
    }, []);
    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <td className="widgetLgTh">Customer</td>
                    <td className="widgetLgTh">Date</td>
                    <td className="widgetLgTh">Amount</td>
                    <td className="widgetLgTh">Status</td>
                </tr>
            {orders.map((order) => (
                <tr className="widgetLgTr" key={order._id}>
                    <td className="widgetLgUser">
                        <span className="widgetLgName">{order.userId}</span>
                    </td>
                    <td className="widgetLgDate">
                        {timeAgo.format(order.createdAt)}
                    </td>
                    <td className="widgetLgAmount">${order.amount}</td>
                    <td className="widgetLgStatus">
                        <Button type={order.status} />
                    </td>
                </tr>
                ))}
            </table>
        </div>
    )
};

export default WidgetLg;
