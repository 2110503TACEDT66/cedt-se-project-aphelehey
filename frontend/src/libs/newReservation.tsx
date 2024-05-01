import { ReservationItem } from "interfaces";

  export default async function newReservation(id:string,token: string, reservation: ReservationItem) {
      console.log('IN');

      const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/restaurants/${id}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          "revDate": reservation.revDate,
          "user": reservation.user // <- Added missing quotation mark here
        })// Convert reservation object to JSON string
      });

      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        throw new Error("Failed to fetch Reservations");
      }

      return data
    }