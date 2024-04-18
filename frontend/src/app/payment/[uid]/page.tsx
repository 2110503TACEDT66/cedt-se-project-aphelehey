'use server'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getPaymentRecords from 'libs/getPaymentRecords';
import { getServerSession } from 'next-auth';
import { paymentItem } from 'interfaces';

export default async function Payment() {

    // const session = await getServerSession()
    // const token = session?.user.token
    // let shops
    // if (token) {
    //     shops = await getPaymentRecords(token)
    // } else {
    //     alert("You need to log in first")
    //     shops={}
    // }

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
                                shops.map((payment:paymentItem) => (
                                <TableRow>
                                    <TableCell align="right">{payment._id}</TableCell>
                                    <TableCell align="right">{payment.createdAt}</TableCell>
                                    <TableCell align="right">{payment.price}</TableCell>
                                    <TableCell align="right">{payment.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    )
}