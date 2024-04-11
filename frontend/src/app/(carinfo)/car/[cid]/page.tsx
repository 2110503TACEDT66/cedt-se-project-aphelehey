import Image from "next/image"
import getRestaurant from "@/libs/getRestaurant"
import { Link } from "@mui/material"
import MenuPanel from "@/components/MenuPanel"
import getMenu from "@/libs/getMenu"
import { MenuJson } from "interfaces"
import { getSession } from "next-auth/react"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"

export default async function RestaurantDetailPage({ params }: { params: { cid: string } }) {
    // Fetch restaurant details
    const restaurantDetail = await getRestaurant(params.cid)

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    console.log(session.user.token)

    // Fetch menu
    const menus = await getMenu(params.cid)
    console.log(menus);

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{restaurantDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={restaurantDetail.data.picture}
                    alt='Restaurant Image'
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]" />
                <div className="text-md mx-5 text-left">
                    {restaurantDetail.data.description}
                    <div className="text-md mx-5">Address: {restaurantDetail.data.address} {restaurantDetail.data.district} {restaurantDetail.data.province} {restaurantDetail.data.postalcode}</div>
                    <div className="text-md mx-5">region: {restaurantDetail.data.region} </div>
                    <div className="text-md mx-5">openCloseTime: {restaurantDetail.data.openCloseTime} </div>

                    <Link href={`/reservations?id=${session.user._id}&restaurant=${restaurantDetail.data.id}&restaurantName=${restaurantDetail.data.name}&picture=${restaurantDetail.data.picture}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                            Make Reservaion
                        </button>
                    </Link>

                </div>

            </div>
            <MenuPanel menuJson={menus} />
        </main >
    )
}
