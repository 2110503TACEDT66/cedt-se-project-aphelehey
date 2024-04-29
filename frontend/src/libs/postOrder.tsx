import { OrderItem } from "interfaces";

const URL = "http://localhost:5000"

export default async function postOrder(order: OrderItem, token: string, restaurantID: string) {
    console.log(order)
    const body = JSON.stringify({
        user: order.user,
        food: order.food,
        price: order.price,
        payment: false,
        location: order.location
    })
    console.log(body)
    const response = await fetch(`${URL}/api/v1/restaurants/${restaurantID}/orders/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: body
    }
    )

    const data = await response.json()

    if (!response.ok) {
        alert(data)
        throw new Error("There is a problem when posting order")
    }

    console.log(data)

    const orderID = data.data._id

    return orderID
}