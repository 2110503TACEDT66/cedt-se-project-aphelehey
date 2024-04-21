export default async function getUserAddresses(token:string) {
  const response = await fetch(`http://localhost:5000/api/v1/userAdresses`, {
      method:"GET",
      headers:{
          authorization: `Bearer ${token}`
      }
  })

  if (!response.ok) {
      alert("Failed to get address records")
      throw new Error("Failed to get address records")
  }

  return await response.json() 
}