export default async function getMenu() {

    const URL = process.env.BACKEND_URL + ":" + process.env.BACKEND_PORT

    const response = await fetch(`${URL}/api/v1/menus/`)

    const data = await response.json()

    console.log(data)
    if (!response.ok) {
        throw new Error("Failed to fetch Menu")
    }

    return data
}