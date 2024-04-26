export default async function getMenu(id: string, year?: number, quater?: number, month?: number) {
    let queryYear = `year=${year}`;
    let queryQuater = ``;
    let queryMonth = ``;
    if (quater) queryQuater = `&quater=${quater}`;
    if (month) queryMonth = `&month=${month}`
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/paymentRecords/salesData?${queryYear}${queryQuater}${queryMonth}`)

    const data = await response.json()

    console.log(data)
    if (!response.ok) {
        throw new Error("Failed to fetch Restaurant")
    }

    return data
}