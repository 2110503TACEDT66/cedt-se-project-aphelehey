import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { ReservationItem ,ReservationJson} from "interfaces";
import getReservations from "@/libs/getReservations";
import Link from "next/link";
import dayjs from "dayjs";

export default function ReservationCart() {
  const [reservationItems, setReservationItems] = useState<ReservationItem[]>([]); // Initialize as empty array
  const { data: session } = useSession();
  const token = session?.user.token;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const fetchedData : ReservationJson = await getReservations(token);
        console.log(fetchedData.data);
        if (fetchedData) {
          setReservationItems(fetchedData.data);
        }
      }
    };
    fetchData();
  }, [token]);

  const handleRemove=(reservationItem:ReservationItem)=>{
    if(reservationItem._id && token){
        const item={
            id: reservationItem._id,
            token:session?.user.token
          }
          dispatch(removeReservation(item));
    }
  }

  const handleUpdate = () =>{

  }
  

  return (
    <>
      {reservationItems.length === 0 ? (
        <p>No Reservation</p>
      ) : (
        reservationItems.map((reservationItem:ReservationItem) => (
          <div
            className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
            key={reservationItem.user}>
            <div className="text-xl">{reservationItem.restaurant?.name}</div>
            <div className="text-sm">Reserve at {dayjs(reservationItem.revDate).format('dddd, MMMM D, YYYY h:mm A')} </div>
            <div className="flex flex-row">
                <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                text-white shadow-sm w-50"
                onClick={() =>handleRemove(reservationItem)}
                >
                Remove
                </button>
                <Link href={`/cart/${reservationItem._id}`}>
                <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                text-white shadow-sm ml-2 w-50"
                >
                Edit
                </button>
                </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
