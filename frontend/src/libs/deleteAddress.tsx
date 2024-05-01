export default async function deleteAddress(token: string, userId: string,index:number) {
    const body = JSON.stringify({
        user:userId,
        index:index
    })
    const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/userAddresses`, {
       
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Capture detailed error message
        throw new Error(`Failed to delete address: ${errorMessage}`);
    }

    console.log(`Address with ID: ${userId} deleted successfully.`); // Log success message
}
