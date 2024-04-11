import Productcard from "./ProductCard"
import Link from "next/link"
import { ReservationItem, ReservationJson } from "interfaces"

export default async function ReservationPanel({ ReservationJSON }: { ReservationJSON: ReservationJson }) {
    const reservationJsonReady = await ReservationJSON

    return (
        <div className="text-left text-2xl text-center">
            <h2>Reservation</h2>
            <div style={{ margin: "20px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", padding: "10px" }}>
                <table className="border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-5 py-2">Restaurant</th>
                            <th className="border border-gray-400 px-5 py-2">Reservation Date</th>
                            <th className="border border-gray-400 px-5 py-2">Reservation Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationJsonReady.data.map((ReservationItem: ReservationItem) => {
                            const reservationDate = new Date(ReservationItem.revDate);

                            const formattedDate = `${reservationDate.getMonth() + 1}/${reservationDate.getDate()}/${reservationDate.getFullYear()}`;

                            const hours = reservationDate.getHours();
                            const minutes = reservationDate.getMinutes();
                            const ampm = hours >= 12 ? 'PM' : 'AM';
                            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
                            return (ReservationItem.restaurant ?
                                <tr className="bg-slate-200" key={ReservationItem._id}>
                                    <td className="border border-gray-400 px-5 py-2">{ReservationItem.restaurant.name}</td>
                                    <td className="border border-gray-400 px-5 py-2">{formattedDate}</td>
                                    <td className="border border-gray-400 px-5 py-2">{formattedTime}</td>
                                </tr> : null
                            );
                        })}

                    </tbody>
                </table>
            </div>
            <Link href="/cart">
                <div className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded text-lg h-200px w-200px'>
                    Manage your Reservation
                </div>
            </Link>
        </div>
    )
}
