import getRestaurants from "@/libs/getRestaurants"
import CarCatalog from "@/components/CarCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { RestaurantItem, RestaurantJson } from "interfaces"
import DeliveryBar from "@/components/DeliveryBar"


export default function Car() {
    const restaurants = getRestaurants()
    return (
        <main className="text-center p-5 bg-slate-100">
            <h1 className="text-2xl font-medium text-black bold">Order with us</h1>
            <h1 className="text-xl font-medium text-black bold">Select Restaurant</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                <CarCatalog restaurantJson={restaurants} />
            </Suspense>
            <h1 className="text-xl font-medium text-black bold">Order with delivery Service</h1>
            <DeliveryBar/>
        </main>
    )
}