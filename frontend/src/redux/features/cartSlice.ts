import { createSlice } from "@reduxjs/toolkit";
import { FoodItem } from "../../../interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

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
      action.payload.quantity = 1
      if (!state.foodItems) {
        state.foodItems = []
      }    
      function checkIfChosen(state:CartState, action: PayloadAction<FoodItem>) {
        const chosenItem = state.foodItems.find(item => item.name === action.payload.name);
        return chosenItem
      }

      const chosenItem = checkIfChosen(state, action)

      if (chosenItem) {
        const chosenItem = checkIfChosen(state, action)
        const currentQuantity = chosenItem?.quantity
        if (currentQuantity) {
          chosenItem.quantity = currentQuantity + 1
        }
      } else {
        state.foodItems.push(action.payload)
      }
    },
    removeReservation:  (state, action: PayloadAction<{ fname: string }>) => { //<-- dispatch(removeReservation({fname: ชื่ออาหาร}))
      const remainItems = state.foodItems.filter(obj =>{
        return (
          obj.name !== action.payload.fname
        )
      })
      state.foodItems = remainItems
    },
    updateQuantity: (state, action: PayloadAction<{name: string, quantity: number}>) => {
      const itemIndex = state.foodItems.findIndex((item) => item.name === action.payload.name)
      if (itemIndex !== -1) {
        const currentQuantity = state.foodItems[itemIndex].quantity
        if (currentQuantity) {
          if (currentQuantity + action.payload.quantity == 0) {
            const remainItems = state.foodItems.filter(obj=>{
              return (
                obj.name !== action.payload.name
              )
            })
            state.foodItems = remainItems
          } else {
          state.foodItems[itemIndex].quantity = currentQuantity + action.payload.quantity
          }
        }
      }

    },
    reset: (state, action) => {
      return state = initialState;
    }
  },
});


export const { addReservation, removeReservation, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;





