'use client'
import { TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import deleteAddress from "@/libs/deleteAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { UserAddress } from "interfaces";

export default function AddressRow({user, userId,index,token}:{user:UserAddress, userId:string,index:number,token:string}) {
    // const [token, setToken] = useState<string | null>(null); // State to hold the token
    const address =`${user.address}`
    const district = `${user.district}`
    const province = `${user.province}`
    const postalcode = `${user.postalcode}`
    // useEffect(() => {
    //     // Function to retrieve session and set token
    //     const retrieveSession = async () => {
    //         try {
    //             const session = await getServerSession(authOptions);
    //             const userToken = session?.user.token || null;
    //             setToken(userToken); // Set the token in state
    //         } catch (error: any) {
    //             console.error("Error retrieving session:", error);
    //         }
    //     };
    //     retrieveSession(); // Call the function to retrieve session
    // },[]); // Run only once on component mount

    const handleDelete = async () => {
        try {
            if (!token) {
                throw new Error("User not authenticated or token unavailable.");
            }
            const del = await deleteAddress(token, userId,index);
            console.log("Address deleted successfully");
        } catch (error: any) {
            console.error("Failed to delete address:", error.message);
        }
    };

    return (
        <TableRow>
            <TableCell>{address+", "+ district+", "+ province+", "+postalcode}</TableCell>
            <TableCell align='center'>{userId}</TableCell>
            <TableCell align='right'>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}