import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getReservations from "@/libs/getReservations"
import { ReservationItem } from "interfaces"
import { Button } from "@mui/material"
import ReservationPanel from "@/components/ReservationPanel"
import Link from "next/link"

export default async function ManagePage() {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const reservation = await getReservations(session.user.token)

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                <ReservationPanel ReservationJSON={reservation}></ReservationPanel>
            </div>
        </main>
    )
}
