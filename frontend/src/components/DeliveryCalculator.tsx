import calculateDistance from "@/libs/calculateDistance";

export default async function DeliveryCalculator(restaurant:string,user_address:string) {
    // Mock data
    // let restaurant = '77-161 Soi Charoen Rat 7 Yeak 7-1, Khwaeng Bang Khlo, Khet Bang Kho Laem, Krung Thep Maha Nakhon 10120';
    // let user_address = 'Wat Phraya Krai, Bang Kho Laem, Bangkok 10120';

    const kilometer = await calculateDistance(restaurant,user_address);

    const distance = parseFloat(kilometer.rows[0].elements[0].distance.text);

    let cost = distance*4.5;

    return (
        <div>
            
        </div>
    );
}