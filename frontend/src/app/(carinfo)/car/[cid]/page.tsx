'use client'
import FoodCard from "@/components/FoodCard";
import getMenu from "@/libs/getMenu";
import { FoodItemAPI } from "interfaces";
import { useEffect, useState } from "react";

export default function MenuPage() {
    
    const [menus, setMenus] = useState<FoodItemAPI[]>()

    useEffect( () => {
        const fetchMenus = async () => {
            const fetchedMenus = await getMenu()
            setMenus(fetchedMenus)
        }

        fetchMenus()
    }, [])

    return (
        <>
            <div className="text-3xl ml-10 mt-3">
               Menu Book ({menus?.length} item(s))
            </div>
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                    menus?.map((item:FoodItemAPI) => (
                        <FoodCard food={item.food} price={item.price} image={item.image}/>
                    ))
                }
            </div>
        </>
    )
}