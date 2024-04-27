export default async function deleteAddress(token: string, addressId: string) {
    console.log(`Deleting address with ID: ${addressId}`); // Log specific address being deleted

    const response = await fetch(`http://localhost:5000/api/v1/userAddresses/${addressId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Capture detailed error message
        throw new Error(`Failed to delete address: ${errorMessage}`);
    }

    console.log(`Address with ID: ${addressId} deleted successfully.`); // Log success message
}
