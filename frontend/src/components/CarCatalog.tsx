import Productcard from "./ProductCard"
import Link from "next/link"
import { RestaurantItem, RestaurantJson } from "interfaces"

export default async function RestaurantCatalog({ restaurantJson }: { restaurantJson: Promise<RestaurantJson>}) {
    // console.log('test')
    const restaurantJsonReady = await restaurantJson
    // console.log(restaurantJsonReady);
    return (
        <>
            Explore {restaurantJsonReady.count} models in our catalog
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                    restaurantJsonReady.data.map((restaurantItem: RestaurantItem) => (
                        <Link href={`/car/${restaurantItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                        p-2 sm:p-4 md:p-4 lg:pd-8">
                            <Productcard restaurantName={restaurantItem.name} imgSrc={restaurantItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}