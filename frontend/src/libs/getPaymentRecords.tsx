export default async function getPaymentRecords(token:string) {
    const response = await fetch(`http://localhost:5000/api/v1/auth/paymentRecords`, {
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
