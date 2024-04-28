import calculateDistance from "@/libs/calculateDistance";
import { RestaurantItem, locationItem } from "interfaces";

const deliveryCalculator = async (selectedRestaurant: RestaurantItem, selectedLocation: locationItem) => {
    // Mock data
    // let restaurant = '77-161 Soi Charoen Rat 7 Yeak 7-1, Khwaeng Bang Khlo, Khet Bang Kho Laem, Krung Thep Maha Nakhon 10120';
    // let user_address = 'Wat Phraya Krai, Bang Kho Laem, Bangkok 10120';
    const stringRestaurant = `${selectedRestaurant.address}, ${selectedRestaurant.district}, ${selectedRestaurant.province}, ${selectedRestaurant.postalcode}`
    const stringUser = `${selectedLocation.address}, ${selectedLocation.district}, ${selectedLocation.province}, ${selectedLocation.postalcode}`
    const kilometer = await calculateDistance(stringRestaurant, stringUser);

    const distance = parseFloat(kilometer.rows[0].elements[0].distance.text);

    let cost = distance * 4.5;
    Math.round(cost)
    return cost;
}