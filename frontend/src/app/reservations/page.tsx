"use client";
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import MenuPanel from "@/components/MenuPanel";
import { useSession } from "next-auth/react";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import getMenu from "@/libs/getMenu";
import { MenuJson } from "../../../interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Image from "next/image"

export default function Reservations() {
  const urlParams = useSearchParams();
  const userid = urlParams.get("id");
  const restaurant = urlParams.get("restaurant");
  const restaurantName = urlParams.get("restaurantName");
  const picture = urlParams.get("picture");

  const { data: session } = useSession();
  const name = session?.user.name;

  const dispatch = useDispatch<AppDispatch>();

  const makeReservation = () => {
    if (revDate && userid && restaurant) {
      const item: ReservationItem = {
        revDate: dayjs(revDate).format("YYYY/MM/DD"),
        user: userid,
        restaurantId: restaurant,
        createdAt: new Date().toISOString(),
        token: session?.user.token
      };
      dispatch(addReservation(item));
    }
  };

  const [revDate, setRevDate] = useState<Dayjs | null>(null);

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="text-xl font-medium">{restaurantName}</div>
      <Image src={picture + ''}
        alt='Restaurant Image'
        width={0} height={0} sizes="100vw"
        className="rounded-lg w-[30%]" />

      <div className="w-fit space-y-2">
        <div className="text-md text-left text-gray-600">Pick-up Date </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="bg-white"
            value={revDate}
            onChange={(value) => {
              setRevDate(value);
            }}
          />
        </LocalizationProvider>
      </div>

      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm"
        onClick={makeReservation}
      >
        Reserve this Car
      </button>

    </main>
  );
}
