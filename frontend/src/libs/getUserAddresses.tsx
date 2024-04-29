export default async function getUserAddresses(token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/userAddresses`, {
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