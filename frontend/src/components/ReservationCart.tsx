import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FoodItem, OrderFoodItem, OrderItem, RestaurantItem, SingleRestaurantJson, locationItem, restaurantItem } from "interfaces";
import styles from '@/components/reservationcart.module.css'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import Image from "next/image";
import { addReservation, removeReservation, updateQuantity } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/store";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Link from 'next/link'
import getUserAddresses from "@/libs/getUserAddresses";
import postOrder from "@/libs/postOrder";
import { useRouter } from "next/navigation";
import postTransaction from "@/libs/postTransaction";
import calculateDistance from "@/libs/calculateDistance";
import getRestaurant from "@/libs/getRestaurant";

export default function ReservationCart() {
  const [location, setLocation] = useState<locationItem[]>()
  const [locationId, setLocationId] = useState<string>()
  const [selectedLocation, setSelectedLocation] = useState<locationItem>()
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantItem>()
  const [deliveryCost, setDeliveryCost] = useState<number>(0)
  const { data: session } = useSession();
  const token = session?.user.token;
  const user = session?.user._id
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChangeQuantity = (name: string, mode: string) => {
    if (mode == "add") {
      dispatch(updateQuantity({ name: name, quantity: 1 }))
    } else if (mode == "reduce") {
      dispatch(updateQuantity({ name: name, quantity: -1 }))
    }
  }

  const reservationItems = useAppSelector((state) =>
    state.cartSlice.foodItems
  )

  const restaurantID = reservationItems[0]?.restaurant


  const handleRemove = (reservationItem: FoodItem) => {
    if (reservationItem.name && token && user) {
      const name = reservationItem.name
      dispatch(removeReservation({ fname: name }));
    }
  }

  const handleSelectLocation = (event: SelectChangeEvent) => {
    const locID = event.target.value
    setLocationId(locID)

    const addressString = location?.find((item) => {
      return item._id === locID
    })

    if (addressString) {

      const selLoc: locationItem = {
        _id: addressString._id,
        address: addressString.address,
        district: addressString.district,
        province: addressString.province,
        postalcode: addressString.postalcode,
        region: addressString.region
      }
      setSelectedLocation(selLoc)
    }
  }


  const handleCheckout = async () => {

    function totalPrice(): number {
      let total: number = 0
      reservationItems.forEach((item: FoodItem) => {
        if (!item.quantity) item.quantity = 1
        total += item.price * item.quantity
      })
      if (deliveryCost) total += deliveryCost;
      return total
    }
    function getProducts(): OrderFoodItem[] {
      const foodItems = reservationItems?.map((item: FoodItem) => { return { name: item.name, price: item.price, quantity: item.quantity ? item.quantity : 1 } })
      if (deliveryCost) foodItems.push({
        name: "ค่าส่ง",
        price: deliveryCost,
        quantity: 1
      })
      return foodItems
    }

    if (selectedLocation&&deliveryCost) {
      const order: OrderItem = {
        food: reservationItems?.map((item: FoodItem) => { return item.name }),
        price: totalPrice(),
        payment: false,
        location: selectedLocation
      }
      if (token && order && restaurantID) {
        const orderID = await postOrder(order, token, restaurantID);
        console.log(orderID);
        // Call Mek's API with orderID here
        const transaction = await postTransaction(session.user.name, order.location, getProducts(), token, orderID);
        console.log(transaction);
        router.push(transaction.url)
      } else {
        alert("If you're able to see this, then something big has happened.")
      }
    }
  }

  useEffect(() => {
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
  useEffect(() => {
    if (restaurantID) {
      const fetchAddress = async (restaurantID: string) => {
        const fetchedAddress: SingleRestaurantJson = await getRestaurant(restaurantID)
        if (fetchedAddress) {
          const resLoc: RestaurantItem = {
            _id: fetchedAddress.data._id,
            name: fetchedAddress.data.name,
            address: fetchedAddress.data.address,
            district: fetchedAddress.data.district,
            province: fetchedAddress.data.province,
            postalcode: fetchedAddress.data.postalcode,
            tel: fetchedAddress.data.tel,
            region: fetchedAddress.data.region,
            openCloseTime: fetchedAddress.data.openCloseTime,
            picture: fetchedAddress.data.picture,
            reservation: fetchedAddress.data.reservation,
            id: fetchedAddress.data.id,
          }
          setSelectedRestaurant(resLoc)
        }
      }
      fetchAddress(restaurantID)
    }

  }, [])
  useEffect(() => {
    const deliveryCalculator = async (selectedRestaurant: RestaurantItem, selectedLocation: locationItem) => {
      if (selectedRestaurant && selectedLocation) {
        const stringRestaurant = `${selectedRestaurant.address},${selectedRestaurant.district},${selectedRestaurant.province},${selectedRestaurant.postalcode}`;
        const stringUser = `${selectedLocation.address},${selectedLocation.district},${selectedLocation.province},${selectedLocation.postalcode}`;
        const kilometer = await calculateDistance(stringRestaurant, stringUser);
        const distance = parseFloat(kilometer.rows[0].elements[0].distance.text);
        let cost = distance * 4.5;
        cost = Math.round(cost);
        return cost;
      }
      return 0;
    };

    const calculateDeliveryCost = async () => {
      if (selectedRestaurant && selectedLocation) {
        const cost = await deliveryCalculator(selectedRestaurant, selectedLocation);
        setDeliveryCost(cost);
      }
    };
    calculateDeliveryCost();
  }, [selectedLocation]);

  return (
    <div className="mt-10 pl-5 mr-5">
      <div className="flex flex-col">
        <div className="text-2xl mb-3"> Deliver To </div>
        <FormControl>
          <Select labelId="location-select" value={locationId} label="location" className="w-96" onChange={handleSelectLocation}>
            {location?.map((item: locationItem) => (
              <MenuItem key={item._id} value={item._id}> {`${item.address} ${item.district} ${item.province} ${item.region} ${item.postalcode}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {reservationItems?.length === 0 || !reservationItems ? (
        <><p className="text-white">No Reservation</p>
        </>
      ) : (
        reservationItems?.map((reservationItem: FoodItem) => (
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
                        <ArrowDropUp className="border border-solid mx-1" onClick={() => { handleChangeQuantity(reservationItem.name, "add") }} />
                        <ArrowDropDown className="border border-solid mx-1" onClick={() => { handleChangeQuantity(reservationItem.name, "reduce") }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid place-items-end w-1/5">
                  <button className="block rounded-md bg-red-700 hover:bg-red-500 px-5 py-3 my-5 mx-5 text-white shadow-sm ml-2 w-50"
                    onClick={() => { handleRemove(reservationItem) }}
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
        ค่าส่ง {deliveryCost} บาท
      </center>
      <center>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-slate-100 text-2xl rounded-xl shadow-md p-5" onClick={handleCheckout}>
          Checkout
        </button>
      </center>
    </div>
  );
}

/* Adding new item to cart
        <button onClick={()=>{handleAdd()}}>add</button>
  
        const handleAdd = () => {
            dispatch(addReservation({
              name: "pizza",
              price: 200,
              picture: "pizza"
          }))
        }
*/