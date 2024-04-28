
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import getUserAddresses from "@/libs/getUserAddresses";
import { getServerSession } from 'next-auth';
import { UserAddressItem } from "interfaces";
import AddressRow from "@/components/addressRow";
import { useSession } from "next-auth/react";
import AddressPage from "@/components/addressPage";
import { useRouter } from 'next/router';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AddresssPage() {
    
    const session = await getServerSession(authOptions)
    const token = session?.user.token
    console.log(token)
    let addresses
    if (token) {
        addresses = await getUserAddresses(token)
    } else {
        return (
            <div className="text-4xl text-pink-700 w-[100%] flex flex-col items-center pt-20 space-y-10"> You must log in first </div>
        )
    }
    
    
    return (
        
        <main>
        <div className="text-white text-4xl bg-black p-2 mb-10">
            Address Records
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            <TableContainer component={Paper} sx={{width: '80%'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            addresses.map((address:UserAddressItem) => (
                                <AddressRow _id={address.addresses.address}  name={address.name} />
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