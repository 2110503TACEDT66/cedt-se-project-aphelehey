"use client"
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import getUserAddresses from "@/libs/getUserAddresses";
import { getServerSession } from 'next-auth';
import { UserAddressItem } from "interfaces";
import AddressRow from "@/components/addressRow";
import { useSession } from "next-auth/react";
import AddressPage from "@/components/addressPage";
import { useRouter } from 'next/router';


export default function AddresssPage() {
    let addresses:UserAddressItem[] = [{
        _id: "661d0bd3b876c31024b8d5bd",
        name: "string",
        addresses:{
            "address": "string",
            "district": "string",
            "province": "string",
            "postalcode": "string",
            "region": "string",
        }
        }]

    return (
        
        <main>
        <div className="text-white text-4xl my-10 mx-20">
            Address Records
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            <TableContainer component={Paper} sx={{width: '80%'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Address ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            addresses.map((address:UserAddressItem) => (
                                <AddressRow _id={address._id}  name={address.name} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            
            <div className="mt-4"> {/* Add margin-top of 4 units */}
            <Button variant="contained" color="primary" href="/address/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Address
            </Button>
        </div>
        </div>
    </main> 
    )  
}