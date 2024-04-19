import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAddress } from "@/libs/getAddress"; // Assuming getAddress fetches addresses
import Link from "next/link";

export default function UserAddresses() {
  const [addresses, setAddresses] = useState<string[]>([]); // Initialize empty array
  const { data: session } = useSession();
  const token = session?.user.token;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const fetchedAddresses = await getAddress(token); // Replace with actual function call
        if (fetchedAddresses) {
          // Map through fetchedAddresses to extract address strings
          const addressStrings = fetchedAddresses.map(address => address.toString());
          setAddresses(addressStrings);
        } else {
          console.log("No addresses found"); // Handle no addresses case (optional)
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      
      {addresses.length === 0 ? (
        <p>No Address Found</p>
      ) : (
        <ul className="list-disc pl-4">
          {/* Map through addresses and display formatted details */}
          {addresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      )}

      {/* Add Address button with Link component for navigation */}
      <Link href="/address/new">
        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm ml-2 w-50">
          Add Address
        </button>
      </Link>
    </>
  );
}
