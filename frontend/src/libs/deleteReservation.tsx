export default async function deleteReservation(token: string,id:string) {

    console.log('Ma tee wai la')

    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/reservations/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch Reservations")
    }
}