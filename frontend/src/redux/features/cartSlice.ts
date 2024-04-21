import { createSlice } from "@reduxjs/toolkit";
import { FoodItem } from "../../../interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import deleteReservation from "@/libs/deleteReservation";
import updateReservation from "@/libs/updateReservation";

type CartState = {
  foodItems: FoodItem[];
}

const initialState:CartState = {
  foodItems: [],
}

export const cartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    addReservation:  (state = initialState, action: PayloadAction<FoodItem>) => {
      if (!state.foodItems) {
        state.foodItems = []
      }
      state.foodItems.push(action.payload)
    },
    removeReservation:  (state, action: PayloadAction<{ fname: string }>) => { //<-- dispatch(removeReservation({fname: ชื่ออาหาร}))
      const remainItems = state.foodItems.filter(obj =>{
        return (
          obj.name !== action.payload.fname
        )
      })
      state.foodItems = remainItems
    },
    // editReservation: (state,action : PayloadAction<{id:string; token : string; item:object}>) =>{
    //     console.log('Update')
    //     console.log(action.payload.token)
    //     console.log(action.payload.id)
    //     const update = async()=>{
    //         const res = await updateReservation(action.payload.id,action.payload.token,action.payload.item)
    //         window.location.reload()
    //     }
    //     update()
    // }
  },
});


export const { addReservation, removeReservation } = cartSlice.actions;
export default cartSlice.reducer;





