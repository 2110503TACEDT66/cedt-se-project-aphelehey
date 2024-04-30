import { addReservation } from "@/redux/features/cartSlice";
import { FoodItemAPI } from "interfaces";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";


export default function FoodCard(item:FoodItemAPI) {

    const dispatch = useDispatch();
    const { cid } = useParams(); // Should be changed to a meaningful name (e.g., rid for "restaurant id")
   
  
    const handleAddToMenu = () => {
      if (cid) {
        dispatch(addReservation({
          name: item.food,
          price: item.price,
          picture: item.image,
          restaurant: cid.toString(),
        }))
        window.alert('1 item added to cart!');
      }
    };

    return (
        <div className='bg-white w-[45rem] h-[150px] rounded-lg shadow-lg flex flex-row hover:shadow-2xl cursor-pointer' onClick={()=>{handleAddToMenu()}}>
            <div className="w-[40%] relative rounded-lg">
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Image src={item.image} alt="Food Image" fill={true} className='object-cover rounded-t-lg'/>
                </div>
            </div>
            <div className="w-[60%] flex flex-row items-center">
                <div className="w-[70%] text-4xl ml-5 truncate text-clip">
                    {`${item.food}  ............................`}
                </div>
                <div className="w-[30%] text-2xl ml-5">
                    {`${item.price} ฿`}
                </div>
            </div>
        </div>
    )
}