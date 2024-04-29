import { OrderFoodItem, locationItem } from "interfaces"

const URL = process.env.BACKEND_URL + ":" + process.env.BACKEND_PORT

export default async function postTransaction(name: string,location:locationItem,orders: OrderFoodItem[], token: string, orderID: string) {
    const body = JSON.stringify({
        user: {
            name: name,
            address: location
        },
        products: orders,
        orderID:orderID
    })
    console.log(body)
    const response = await fetch(`${URL}/api/v1/transactions/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: body
        }
    )

    const data = await response.json()

    if (!response.ok) {
        alert(data)
        throw new Error ("There is a problem when posting order")
    }
    
    //console.log(data)

    return data
}