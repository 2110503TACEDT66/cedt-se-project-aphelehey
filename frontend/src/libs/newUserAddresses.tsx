import { UserAddress } from "interfaces";
export default async function createNewAddress(newAddress: UserAddress) {
  console.log('IN'); // Optional debugging log

  const url = `${process.env.BACKEND_URL}/api/v1/userAddresses`;

  const body = JSON.stringify({ address: newAddress }); // Include address data

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header (if required) with appropriate user credentials
      },
      body,
    });

    if (!response.ok) {
      throw new Error("Failed to create user address");
    }

    const data = await response.json();
    console.log('Response data:', data); // Optional debugging log
    return data;
  } catch (error) {
    console.error('Error creating user address:', error);
    throw error; // Re-throw for handling in the calling component
  }
}
