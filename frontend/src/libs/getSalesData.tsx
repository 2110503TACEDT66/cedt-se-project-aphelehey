export default async function getSalesData(token: string, id: string, year?: string, quater?: string, month?: string) {
    let queryYear = `year=${year}`;
    let queryQuater = ``;
    let queryMonth = ``;
    if (quater) queryQuater = `&quater=${quater}`;
    if (month) queryMonth = `&month=${month}`
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/restaurants/${id}/paymentRecords/salesData?${queryYear}${queryQuater}${queryMonth}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    console.log(data)
    if (!response.ok) {
        throw new Error("Failed to fetch Restaurant")
    }

    return data
}