import { UserAddress } from "interfaces";

export default async function createNewAddress(newAddress: UserAddress, authorizationToken?: string) {
  console.log('IN'); // Optional debugging log

  const url = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/userAddresses`;

  const body = JSON.stringify({ address: newAddress }); // Include address data

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
          address: useraddress
          
      })
  })
  if (!response.ok) {
      throw new Error("Failed to createNewAddress")
  }

  return await response.json()
}