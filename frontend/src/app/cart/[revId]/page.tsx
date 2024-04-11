'use client'
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";

import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem, RestaurantItem, RestaurantJson } from "interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import MenuPanel from "@/components/MenuPanel";
import { useSession } from "next-auth/react";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import getMenu from "@/libs/getMenu";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import getRestaurants from "@/libs/getRestaurants";
import { editReservation } from "@/redux/features/cartSlice";

export default  function editReservationPage({
  params,
}: {
  params: { revId: string };
}) {
  // const urlParams = useSearchParams();
  // const userid = urlParams.get("id");
  // const restaurant = urlParams.get("restaurant");
  // const restaurantName = urlParams.get("restaurantName");
  // const picture = urlParams.get("picture");
  // // const revId= urlParams.get(revId);

  const { data: session } = useSession();
  const token = session?.user.token
  const userid = session?.user._id

  const [restaurantId, setRestaurantId] = useState("");
  const [restaurants, setRestaurants] = useState<RestaurantJson>();

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const fetchData = async () => {
        const restaurantJson:RestaurantJson = await getRestaurants()
        setRestaurants(restaurantJson)
    }
    fetchData()
}, [])
  

  

const updateReservation = () => {
  if (revDate && userid && restaurants&&token) {
    const item= {
      id: params.revId,
      token: token,
      item: {
        revDate: dayjs(revDate).format("YYYY/MM/DD"),
        restaurant: restaurantId,
        createdAt: new Date().toISOString(),
      }
    };
    dispatch(editReservation(item));
  }
};

  const [revDate, setRevDate] = useState<Dayjs | null>(null);

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">
        Edit Reservation ID:{params.revId}
      </div>
      <Select
        variant="standard"
        name="restaurant"
        id="restaurant"
        value={restaurantId}
        className="h-[2em] w-[200px]"
        onChange={(e) => {
          setRestaurantId(e.target.value as string);
        }}
      >
        {restaurants ? (
          restaurants.data.map((restaurant: RestaurantItem) => (
            <MenuItem key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </MenuItem>
          ))
        ) : null}
      </Select>

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
        onClick={updateReservation}
      >
        Reserve this Car
      </button>
    </main>
  );
}


