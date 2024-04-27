'use client'
import getSalesData from "@/libs/getSalesData";
import { RestaurantItem, RestaurantJson, salesDataJson } from "interfaces";
import { useState } from "react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SalesRecord from "@/components/SalesRecord";
import { useSession } from "next-auth/react";

export default function Sales() {
    const [restaurants, setRestaurants] = useState<RestaurantJson>();
    const [salesData, setSalesData] = useState<salesDataJson>();
    const [restaurantId, setRestaurantId] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [quater, setQuater] = useState("");
    const [submit, setSubmit] = useState(false);
    const { data: session } = useSession()
    const token = session?.user.token;
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 50; year--) {
        years.push(year);
    }
    const months = [];
    for (let i = 12; i > 0; i--) {
        months.push(i);
    }
    const quaters = [4, 3, 2, 1];
    useEffect(() => {
        const fetchData = async () => {
            const restaurantJson: RestaurantJson = await getRestaurants()
            setRestaurants(restaurantJson)
        }
        fetchData()
    }, [])
    useEffect(() => {
        if (token && restaurantId) {
            const fetchData = async () => {
                const salesDataJson: salesDataJson = await getSalesData(token, restaurantId, year, quater, month)
                setSalesData(salesDataJson)
            }
            fetchData()
        }
    }, [submit])
    return (
        <main>
            <div>
                <h1>Search</h1>
                <div className="flex flex-row">
                    <div>
                        <Select
                             style={{ marginTop: '10px' , marginRight: '10px'}}
                            variant="standard"
                            name="restaurant"
                            id="restaurant"
                            value={restaurantId}
                            className="h-[2em] w-[200px]"
                            onChange={(e) => {
                                setRestaurantId(e.target.value as string);
                            }}
                        >
                            {restaurants ? (
                                restaurants.data.map((restaurant: RestaurantItem) => (
                                    <MenuItem key={restaurant._id} value={restaurant._id}>
                                        {restaurant.name}
                                    </MenuItem>
                                ))
                            ) : null}
                        </Select>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="year-select-label">Year</InputLabel>
                            <Select
                                style={{ marginRight: '10px' , marginLeft : '10px', width: '100px'}}
                                labelId="year-select-label"
                                id="year-select"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value as string);
                                }}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="quater-select-label">Quater</InputLabel>
                            <Select
                              style={{ marginRight: '10px' , marginLeft : '10px', width: '100px'}}
                                labelId="quater-select-label"
                                id="quater-select"
                                value={quater}
                                onChange={(e) => {
                                    setQuater(e.target.value as string);
                                    setMonth("")
                                }}
                            >
                                {quaters.map((quater) => (
                                    <MenuItem key={quater} value={quater}>
                                        {quater}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="month-select-label">Month</InputLabel>
                            <Select
                               style={{ marginRight: '10px' , marginLeft : '10px', width: '100px'}}
                                labelId="month-select-label"
                                id="month-select"
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value as string);
                                    setQuater("")
                                }}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm"
                            onClick={() => { setSubmit(!submit) }}
                            style={{ marginTop: '10px' , marginLeft : '10px'}}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {salesData ? <SalesRecord sales={salesData} /> : null}
        </main>
    )
}