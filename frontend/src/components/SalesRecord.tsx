'use client'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import getSalesData from "@/libs/getSalesData";
import { getServerSession } from 'next-auth';
import { paymentItem, salesDataJson } from 'interfaces';
import SalesRecordRow from '@/components/SalesRecordRow'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function SalesRecord({ sales }: { sales: salesDataJson }) {
    return (
        <main>
            {sales.data.length !== 0 ?
                (<div className="text-black text-4xl my-10 mx-20">
                    Sales Data Restaurant: {sales.data[0].restaurant.name}
                </div>) : (<div className="text-black text-4xl my-10 mx-20">
                    No Sales Data
                </div>)
            }
            <div className='w-[100%] flex flex-col items-center'>
                <TableContainer component={Paper} sx={{ width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow className="font-bold">
                                <TableCell className="w-[25%]">Sale ID</TableCell>
                                <TableCell align="left" className="w-[40%]">Food</TableCell>
                                <TableCell align="center" className="w-[25%]">Date</TableCell>
                                <TableCell align="center" className="w-[10%]">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                sales.data.map((sale: paymentItem) => (
                                    <SalesRecordRow _id={sale._id} createdAt={sale.createdAt} price={sale.price} foods={sale.food} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {sales.data.length !== 0 ?
                (<div className="text-black text-4xl my-10 mx-20">
                    Total Sales: {sales.sales}
                </div>) : (<div className="text-black text-4xl my-10 mx-20">
                    No Sales Data
                </div>)
            }
        </main>)
}
