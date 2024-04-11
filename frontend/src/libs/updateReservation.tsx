import { ReservationItem } from "interfaces";

export default async function updateReservation(id: string,token: string, reservation: object) {
  try {
    console.log(JSON.stringify(reservation));
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reservation) // Convert reservation object to JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Reservations");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in newReservations function: ${(error as Error).message}`);
  }
}