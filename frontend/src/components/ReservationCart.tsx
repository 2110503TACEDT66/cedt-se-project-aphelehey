import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FoodItem, OrderItem} from "interfaces";
import styles from '@/components/reservationcart.module.css'
import Image from "next/image";
import { addReservation, removeReservation } from "@/redux/features/cartSlice";
import getMenu from "@/libs/getMenu";
import getMenus from "@/libs/getMenus";
import { useAppSelector } from "@/redux/store";

export default function ReservationCart() {
  // const [reservationItems, setReservationItems] = useState<OrderItem[]>([]); // Initialize as empty array
  const [menuItems, setMenuItems] = useState<FoodItem[]>([])
  const { data: session } = useSession();
  const token = session?.user.token;
  const user = session?.user._id
  const dispatch = useDispatch();

  const reservationItems = useAppSelector((state)=>
    state.cartSlice.foodItems
  )

  const handleRemove=(reservationItem:FoodItem)=>{
    if(reservationItem.name && token && user){
        const name = reservationItem.name
          dispatch(removeReservation({fname: name}));
    }
  }

  return (
    <>
      {reservationItems?.length === 0 || !reservationItems ? (
        <><p>No Reservation</p>
        </>
      ) : (
        reservationItems?.map((reservationItem:FoodItem) => (
          <div key={reservationItem.name} className="flex my-10 pl-5 mr-5">
            <Image src={`/img/${reservationItem.picture}.jpg`} alt="Image Placement Here" width={200} height={200} className={styles.image}></Image>
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
    </>
  );
}

  // REMOVE BEFORE MERGING TO MAIN

        /* ADD FOOD TO CART TEST 
        
        // const handleAdd = () => {
          //   dispatch(addReservation({
          //     name: "pizza",
        //     price: 200,
        //     picture: "pizza"
        //   }))
        // }

        //=====================================================================
        <button className="block rounded-md bg-red-700 hover:bg-red-500 px-5 py-3 my-5 mx-5 text-white shadow-sm ml-2 w-50"
          onClick={() => {handleAdd()}}>
          Test Add
        </button> */

        //=====================================================================
         //Function to look up a price (not needed anymore)
        // const priceAndPicLook = (fname: string) => {
        //   const match = menuItems.find((menu) => menu.name === fname) 
        //   return {price: match?.price, picture: match?.picture}
        // }

    //===========================================================================
    // UseEffect is not needed because we store data in the local storage.
    // useEffect(() => {
    // const fetchData = async () => {
    //   if (token) {
    //     // const fetchDataJson = await getAllOrders(token);
    //     // const fetchedData:OrderItems[] = fetchDataJson.data
    //     const fetchedData:OrderItem[] = [ //<-- Just a mock data to test. There shouldn't be duplicate foods.
    //     {
    //       _id: "2411244113214",
    //       food: ["Pizza","Pizzer","Pizzest"],
    //       price: 200,
    //       payment: true,
    //       restaurant: "65e44c37cb8aa54383faa2d2",
    //     },
    //   ]
    //     console.log(fetchedData);
    //     if (fetchedData) {
    //       setReservationItems(fetchedData);
    //     }
    //   }

      // const fetchMenu = async () => {
      // //const fetchedMenu = await getMenus()
      // Mock Data again
      // const fetchedMenu:FoodItem[] = [
      //   {
      //    name: "Pizza",
      //    price: 100,
      //    picture: "pizza"
      //   },
      //   {
      //     name: "Pizzer",
      //     price: 200,
      //     picture: "pizza"
      //   },
      //   {
      //     name: "Pizzest",
      //     price: 300,
      //     picture: "pizza"
      //   }
      // ]

      // if (fetchedMenu) {
      //   setMenuItems(fetchedMenu);
      // }
    // }
    // fetchData();
    // fetchMenu();

    // };

    

    