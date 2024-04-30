import { UserAddress } from "interfaces"
export default async function createNewAddress(useraddress:UserAddress,token:string) {

  
  const response = await fetch('http://localhost:5000/api/v1/userAddresses', {
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