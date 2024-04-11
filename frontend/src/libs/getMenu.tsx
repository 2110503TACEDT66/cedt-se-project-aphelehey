export default async function getMenu(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/menus`)

    const data = await response.json()

    console.log(data)
    if (!response.ok) {
        throw new Error("Failed to fetch Menu")
    }

    return data
}