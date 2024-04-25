import { OrderItem } from "interfaces";

const URL = "http://localhost:5000"

export default async function postOrder(order: OrderItem, token: string) {
    const response = await fetch(`${URL}}/api/v1/restaurant/:restaurantId/orders/`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            user: order.user,
            food: order.food,
            price: order.price,
            payment: false,
            location: order.location
        })
        }
    )

    const data = await response.json()

    if (!response.ok) {
        alert(data)
        throw new Error ("There is a problem when posting order")
    }
    
    const orderID = data.data._id

    return orderID
}