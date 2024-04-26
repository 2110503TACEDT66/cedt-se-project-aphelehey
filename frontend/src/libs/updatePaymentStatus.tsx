import { ReservationItem } from "interfaces";

export default async function updatePaymentStatus(id: string,token: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/paymentRecords/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
        Authorization: `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Order");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in Order function: ${(error as Error).message}`);
  }
}