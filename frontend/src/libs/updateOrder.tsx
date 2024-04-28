import { OrderItem } from "interfaces";

const URL = "http://localhost:5000";

export default async function updateOrder(orderID: string, token: string) {
  const response = await fetch(`${URL}/api/v1/orders/${orderID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      payment: true,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data);
    throw new Error("There is a problem when updating order");
  }

  //console.log(data)

  return orderID;
}
