import { createSlice } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import newReservation from "@/libs/newReservation";
import deleteReservation from "@/libs/deleteReservation";
import updateReservation from "@/libs/updateReservation";



type CartState = {
  restaurantItems: ReservationItem[];
};


const initialState: CartState = { restaurantItems: [] };


export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addReservation:  (state, action: PayloadAction<ReservationItem>) => {
        const newReservationItem = action.payload;
        const token = newReservationItem.token;
        const userid = newReservationItem.user

        const create = async()=>{
            console.log(token)
            if(newReservationItem.restaurantId && token){
                console.log('pong')
                await newReservation(newReservationItem.restaurantId,token,newReservationItem)
                console.log(',,,')
            }
        }

        console.log(userid);
        create();
        
    },
    removeReservation:  (
      state,
      action: PayloadAction<{ id: string; token: string }>
    ) => {
        console.log(action.payload.token)
        console.log(action.payload.id)
        const deleteRes = async()=>{
            const res = await deleteReservation(action.payload.token,action.payload.id);
            window.location.reload()
        }
        deleteRes();
    },
    editReservation: (state,action : PayloadAction<{id:string; token : string; item:object}>) =>{
        console.log('Update')
        console.log(action.payload.token)
        console.log(action.payload.id)
        const update = async()=>{
            const res = await updateReservation(action.payload.id,action.payload.token,action.payload.item)
            window.location.reload()
        }
        update()
    }
  },
});


export const { addReservation, removeReservation ,editReservation} = cartSlice.actions;
export default cartSlice.reducer;





