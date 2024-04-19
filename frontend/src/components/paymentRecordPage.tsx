'use server'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { paymentItem } from 'interfaces';
import PaymentRecordRow from "./paymentRecordRow";

export default async function PaymentRecordPage({payments}:{payments:Promise<paymentItem[]>}) {

    const paymentsReady = await payments

    return (
        <main>
        <div className="text-white text-4xl my-10 mx-20">
            Payment Records
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            <TableContainer component={Paper} sx={{width: '80%'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Payment ID</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Branch</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            paymentsReady.map((payment:paymentItem) => (
                            <PaymentRecordRow _id={payment._id} createdAt={payment.createdAt} price={payment.price} name={payment.restaurant.name}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </main>    
    )
}