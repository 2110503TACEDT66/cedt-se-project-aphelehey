export default async function calculateDistance(restaurant: String, user_address: String) {
    //mock up
    try {
        console.log(`https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${restaurant}&origins=${user_address}&key=AIzaSyCZZU_uP2OVOJHq4azzOS-e5yCHjacDQxo`);
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${restaurant}&origins=${user_address}&key=AIzaSyCZZU_uP2OVOJHq4azzOS-e5yCHjacDQxo`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }

}
