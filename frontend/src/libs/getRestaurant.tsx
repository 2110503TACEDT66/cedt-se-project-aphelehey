export default async function getRestaurant(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/restaurants/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch Restaurant")
    }

    return await response.json()
}