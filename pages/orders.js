import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  function fetchOrders() {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }
  async function deleteOrder(order) {
    const { _id } = order;
    await axios.delete("/api/orders?_id=" + _id);
    fetchOrders();
  }
  return (
    <Layout>
      <h1>orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <td>Date</td>
            <td>Paid</td>
            <td>Reciept</td>
            <td>Products</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-500" : "text-red-500"}>
                  {order.paid ? "Yes" : "No"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city}
                  {order.pinCode}
                  <br />
                  {order.streetAddress}
                  {order.country}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
                <td>
                  <button className="btn-red flex items-center" onClick={() => deleteOrder(order)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
