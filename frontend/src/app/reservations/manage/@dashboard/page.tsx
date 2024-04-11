import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DashboardPage() {

    const addRestaurant = async (addRestaurantForm: FormData) => {
        "use server"
        const name = addRestaurantForm.get("name")
        const address = addRestaurantForm.get("address")
        const district = addRestaurantForm.get("district")
        const province = addRestaurantForm.get("province")
        const postalcode = addRestaurantForm.get("postalcode")
        const tel = addRestaurantForm.get("tel")
        const region = addRestaurantForm.get("region")
        const openCloseTime = addRestaurantForm.get("openCloseTime")
        const picture = addRestaurantForm.get("picture")

        try {
            await dbConnect()
            const restaurant = await Restaurant.create({
                "name": name,
                "address": address,
                "district": district,
                "province": province,
                "postalcode": postalcode,
                "tel": tel,
                "region": region,
                "openCloseTime": openCloseTime,
                "picture": picture
            })

        } catch (error) {
            console.log(error)
        }
        revalidateTag("restaurants")
        redirect("/restaurant")
    }
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                    <tr><td>Role</td><td>{profile.data.role}</td></tr>
                    <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table>

            {
                (profile.data.role == "admin") ?
                    <form action={addRestaurant}>
                        <div className="text-xl text-blue-700">Add Restaurant</div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                            <input type='text' required id="name" name="name" placeholder="Restaurant Name"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                            <input type='text' required id="picture" name="picture" placeholder="URL"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Address</label>
                            <input type='text' required id="address" name="address" placeholder="Restaurant Address"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="seats">District</label>
                            <input type='text' required id="district" name="district" placeholder="District"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                            <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="province">Province</label>
                            <input type='text' required id="province" name="province" placeholder="Province"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="seats">Postalcode</label>
                            <input type='text' required id="postalcode" name="postalcode" placeholder="Postalcode"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                            <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="province">Region</label>
                            <input type='text' required id="region" name="region" placeholder="Region"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="seats">Tel</label>
                            <input type='text' required id="tel" name="tel" placeholder="Tel"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                            <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="province">openCloseTime(GMT+7)</label>
                            <input type='text' required id="openCloseTime" name="openCloseTime" placeholder="8.00-23.00"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"></input>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Restaurant</button>
                    </form>
                    : null
            }
        </main>
    )
}
