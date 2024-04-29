'use client'
import createNewAddress from "@/libs/newUserAddresses";
import { useState } from "react";
import { UserAddress } from "interfaces";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default  function createNewAddressPage() {
    
    const [address, setaddress] = useState('');
    const [district, setdistrict] = useState('');
    const [province, setprovince] = useState('');
    const [postalcode, setpostalcode] = useState('');
    const [region, setregion] = useState('');
    const { data: session } = useSession();
    const token = session?.user.token;

    const handleRegister = async () => {

      const userAddress = {
         // Create a nested object for address details
          address,
          district,
          province,
          postalcode,
          region,
        
      };
  
      await createNewAddress(userAddress,token); // Pass the userAddress object
  
      alert("Create Complete");
    }

    return (
        <main className="bg-white p-5 w-[100%] flex flex-col items-center space-y-4 justify-center">
            <div className="text-2xl font-bold">Address</div>
            <form className="flex items-center flex-col">
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                            <input type='text' required id="address" name="address" placeholder="your address"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setaddress(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="district">District</label>
                            <input type='text' required id="district" name="district" placeholder="district"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setdistrict(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="province">Province</label>
                            <input type='text' required id="province" name="province" placeholder="province"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setprovince(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="postalcode">Postalcode</label>
                            <input type='text' required id="postalcode" name="postalcode" placeholder="xxxxx"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setpostalcode(e.target.value)}}></input>
                        </div>
                        <div className="flex items-center w-1/2 my-2 w-full">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="region">Region</label>
                            <input type='text' required id="region" name="region" placeholder="region"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400" onChange={(e)=>{setregion(e.target.value)}}></input>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={(e)=>{e.preventDefault(); handleRegister()}}>Create Address</button>
                </form>
        </main>
    )
}