'use client'
import FoodCard from "@/components/FoodCard";
import getMenu from "@/libs/getMenu";
import { Button } from "@mui/material";
import { FoodItemAPI } from "interfaces";
import Link from "next/link";
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
            <div className="text-3xl p-2 ml-0 mt-0 text-white bg-slate-500">
               Menu Book ({menus?.length} item(s))
            </div>
            <div className="bg-slate-100 p-10 " style={{ margin: "0px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                    menus?.map((item:FoodItemAPI) => (
                        <FoodCard food={item.food} price={item.price} image={item.image}/>
                    ))
                }
            </div>
            <center>
                <Button variant="contained" color="primary" href="/cart" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    My cart
                </Button>
            </center>
        </>
    )
}
