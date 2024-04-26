'use server'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import getSalesData from "@/libs/getSalesData";
import { getServerSession } from 'next-auth';
import { paymentItem } from 'interfaces';
import SalesRecordRow from '@/components/SalesRecordRow'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Payment(id: string, year?: number, quater?: number, month?: number) {

    const session = await getServerSession(authOptions)
    const token = session?.user.token

    let sales;
    if (token) {
        sales = await getSalesData(token,id,year,quater,month)
    } else {
        return (
            <div className="text-4xl text-pink-700 w-[100%] flex flex-col items-center pt-20 space-y-10"> You must log in first </div>
        )
    }

    return (
    <main>
        <div className="text-white text-4xl my-10 mx-20">
            Sales
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            <TableContainer component={Paper} sx={{width: '80%'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sale ID</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sales.map((sale:paymentItem) => (
                            <SalesRecordRow _id={sale._id} createdAt={sale.createdAt} price={sale.price}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </main>    )
}
