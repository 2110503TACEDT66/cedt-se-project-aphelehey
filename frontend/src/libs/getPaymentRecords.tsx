export default async function getPaymentRecords(token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/paymentRecords`, {
        method:"GET",
        headers:{
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        alert("Failed to get payment records")
        throw new Error("Failed to get payment records")
    }

    return await response.json() 
}
