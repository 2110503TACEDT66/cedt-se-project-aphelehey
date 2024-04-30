'use server'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import getPaymentRecords from '@/libs/getPaymentRecords';
import { getServerSession } from 'next-auth';
import { paymentItem } from 'interfaces';
import PaymentRecordRow from "@/components/paymentRecordRow";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Payment() {

    const session = await getServerSession(authOptions)
    const token = session?.user.token
    console.log(token)
    let payments
    if (token) {
        payments = await getPaymentRecords(token)
    } else {
        return (
            <div className="text-4xl text-pink-700 w-[100%] flex flex-col items-center pt-20 space-y-10"> You must log in first </div>
        )
    }

    return (
    <main>
        <div className="text-4xl my-10 mx-20">
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            payments.map((payment:paymentItem) => (
                            <PaymentRecordRow _id={payment._id} createdAt={payment.createdAt} price={payment.price} foods={payment.food}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </main>    )
}
