export default async function getUserAddresses(token:string) {
    const response = await fetch(`http://localhost:5000/api/v1/userAddresses`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        console.log("User doesn't have any address")
        return;
    }

    return data
}