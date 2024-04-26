'use client'
import getSalesData from "@/libs/getSalesData";
import { RestaurantItem, RestaurantJson } from "interfaces";
import { useState } from "react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function Sales() {
    const [restaurants, setRestaurants] = useState<RestaurantJson>();
    const [restaurantId, setRestaurantId] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [quater, setQuater] = useState("");
    // const [showSalesRecord, setShowSalesRecord] = useState(false);
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 50; year--) {
        years.push(year);
    }
    const months = [];
    for (let i = 12; i >= 0; i--) {
        months.push(i);
    }
    const quarters = [4, 3, 2, 1]
    useEffect(() => {
        const fetchData = async () => {
            const restaurantJson: RestaurantJson = await getRestaurants()
            setRestaurants(restaurantJson)
        }
        fetchData()
    }, [])

    // const showSalesRecord = () => {

    // }
    return (
        <main>
            <div>
                <h1>Search</h1>
                <div className="flex flex-row">
                    <div>
                        <Select
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
                            <InputLabel id="quater-select-label">Year</InputLabel>
                            <Select
                                labelId="quater-select-label"
                                id="quater-select"
                                value={quater}
                                onChange={(e) => {
                                    setQuater(e.target.value as string);
                                }}
                            >
                                {years.map((quater) => (
                                    <MenuItem key={quater} value={quater}>
                                        {quater}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="month-select-label">Year</InputLabel>
                            <Select
                                labelId="month-select-label"
                                id="month-select"
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value as string);
                                }}
                            >
                                {years.map((month) => (
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
                            onClick={}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <SalesRecord id={restaurantId} year={year} quater={quater} month={month} />
        </main>
    )
}