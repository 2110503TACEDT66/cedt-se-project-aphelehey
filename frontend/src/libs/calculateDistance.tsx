export default async function calculateDistance(restaurant: string, user_address: string) {
    //mock up
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${restaurant}&origins=${user_address}&key=AIzaSyCZZU_uP2OVOJHq4azzOS-e5yCHjacDQxo`)
        if (!response.ok) {
            alert("Failed to get distance")
            throw new Error("Failed to calculate distance")
        }
        return await response.json();
    }
    catch (error) {
        alert(error);
    }

}
