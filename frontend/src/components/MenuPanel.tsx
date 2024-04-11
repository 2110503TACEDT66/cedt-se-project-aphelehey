import Productcard from "./ProductCard"
import Link from "next/link"
import { MenuItem, MenuJson, FoodItem } from "interfaces"

export default async function MenuPanel({ menuJson }: { menuJson: MenuJson }) {
    const menuJsonReady = await menuJson
    return (
        <div className="text-left text-2xl">
            Recommend Dish
            <div style={{ margin: "20px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", padding: "10px" }}>
                {
                    menuJsonReady.data.map((menuItem: MenuItem) => (
                        <div className="w-full">
                            <div className="text-xl">{menuItem.name}</div>
                            <div className="w-full flex flex-row">


                                {menuItem.food.map((foodItem: FoodItem) => (
                                    <div className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:pd-8" key={menuItem._id}>
                                        <Productcard key={foodItem.name} restaurantName={foodItem.name} imgSrc={foodItem.img} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
