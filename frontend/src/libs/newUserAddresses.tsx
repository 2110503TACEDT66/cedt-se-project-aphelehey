import { UserAddress } from "interfaces";

export default async function createNewAddress(newAddress: UserAddress, authorizationToken?: string) {
  console.log('IN'); // Optional debugging log

  const url = `http://localhost:5000/api/v1/userAddresses`;

  const body = JSON.stringify({ address: newAddress }); // Include address data

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        ...(authorizationToken ? { 'Authorization': `Bearer ${authorizationToken}` } : {}), // Add Authorization header conditionally
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
