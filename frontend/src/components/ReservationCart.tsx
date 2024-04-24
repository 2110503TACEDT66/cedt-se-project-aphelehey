import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FoodItem, OrderItem, locationItem} from "interfaces";
import styles from '@/components/reservationcart.module.css'
import {ArrowDropUp, ArrowDropDown} from '@mui/icons-material'
import Image from "next/image";
import { addReservation, removeReservation, updateQuantity } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/store";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Link from 'next/link'
import getUserAddresses from "@/libs/getUserAddresses";

export default function ReservationCart() {
  const [location, setLocation] = useState<locationItem[]>()
  const [locationId, setLocationId] = useState<string>()
  const [selectedLocation, setSelectedLocation] = useState<string>()
  const { data: session } = useSession();
  const token = session?.user.token;
  const user = session?.user._id
  const dispatch = useDispatch();

  const handleChangeQuantity = (name: string, mode: string) => {
    if (mode == "add") {
      dispatch(updateQuantity({name: name, quantity: 1}))
    } else if (mode == "reduce") {
      dispatch(updateQuantity({name: name, quantity: -1}))
    }
  }

  const reservationItems = useAppSelector((state)=>
    state.cartSlice.foodItems
  )

  const handleRemove=(reservationItem:FoodItem)=>{
    if(reservationItem.name && token && user){
        const name = reservationItem.name
          dispatch(removeReservation({fname: name}));
    }
  }

  const handleSelectLocation = (event:SelectChangeEvent) => {
    const addressString = event.target.value
    setLocationId(event.target.value)
    setSelectedLocation(addressString)
  }

  //only for test
   const handleAdd = () => {
            dispatch(addReservation({
              name: "pizza",
            price: 200,
            picture: "pizza"
          }))
        }


  useEffect(()=>{
    const fetchAddress = async () => {
      if (token) {
      const fetchedAddress = await getUserAddresses(token)
       if (fetchedAddress) {
          setLocation(fetchedAddress.addresses)
        }
      }
    }

    fetchAddress()
  }, [token])

  return (
    <div className="mt-10 pl-5 mr-5">
        <div className="flex flex-col">
          <div className="text-2xl mb-3"> Deliver To </div>
          <FormControl>
          <Select labelId="location-select" value={selectedLocation} label="location" className="w-96" onChange={handleSelectLocation}>
            {location?.map((item:locationItem) => (
              <MenuItem key={item._id} value={item._id}> {`${item.address} ${item.district} ${item.province} ${item.region} ${item.postalcode}`}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>
      {reservationItems?.length === 0 || !reservationItems ? (
        <><p>No Reservation</p>
        <button onClick={()=>{handleAdd()}}>add</button>
        </>
      ) : (
        reservationItems?.map((reservationItem:FoodItem) => (
          <div key={reservationItem.name} className="flex my-10">
            <Image src={`/img/foods/${reservationItem.picture}.jpg`} alt="Image Placement Here" width={200} height={200} className={styles.image}></Image>
            <div
            className="border-solid border-2 border-slate-300 w-[100%] pr-5">
              <div className="flex h-full">
                <div className="flex w-4/5">
                    <div className="flex flex-col">
                      <div className="text-4xl p-5">
                          {reservationItem.name}
                      </div>
                      <div className="text-2xl px-5">
                          {`${reservationItem.price} ฿`}
                      </div>
                      <div className="text-xl p-5 flex flex-">
                          {`${reservationItem.quantity} Items`}
                          <div className="ml-2">
                            <ArrowDropUp className="border border-solid mx-1" onClick={()=>{handleChangeQuantity(reservationItem.name, "add")}}/>
                            <ArrowDropDown className="border border-solid mx-1" onClick={()=>{handleChangeQuantity(reservationItem.name, "reduce")}}/>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="grid place-items-end w-1/5">
                    <button className="block rounded-md bg-red-700 hover:bg-red-500 px-5 py-3 my-5 mx-5 text-white shadow-sm ml-2 w-50"
                    onClick={()=>{handleRemove(reservationItem)}}
                    >
                      Remove
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <center>
        <Link href="/payment">
          <button className = "bg-emerald-600 hover:bg-emerald-500 text-slate-100 text-2xl rounded-xl shadow-md p-5">
          Checkout
          </button>
        </Link>
      </center>
    </div>
  );
}