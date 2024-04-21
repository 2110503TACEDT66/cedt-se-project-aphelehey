'use server'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import AddressRow from "./addressRow";
import { UserAddressItem, AddressesItem } from "interfaces";
import { User } from "next-auth";

export default async function AddressPage({addresses}:{addresses:Promise<UserAddressItem[]>}) {

    const addressesReady = await addresses

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
                            <TableCell align="right">Name</TableCell>
                            
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            addressesReady.map((address:UserAddressItem) => (
                            <AddressRow _id={address._id}  name={address.name}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </main>    
    )
}