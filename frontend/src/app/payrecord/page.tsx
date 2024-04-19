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
                            payments.map((payment:paymentItem) => (
                            <PaymentRecordRow _id={payment._id} createdAt={payment.createdAt} price={payment.price} name={payment.restaurant.name}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </main>    )
}

    //mock data
    // let payments:paymentItem[] = [{
    //     _id: "661d0bd3b876c31024b8d5bd",
    //     user: "6618f624ebcf2d9a9686f108",
    //     food: [
    //         "pizza",
    //         "sushi",
    //         "water"
    //     ],
    //     price: 400,
    //     payment: true,
    //     location: {
    //         "address": "String",
    //         "district": "String",
    //         "province": "String",
    //         "postalcode": "String",
    //         "region": "String",
    //         "_id": "661d0953a295892c8c22f0f6"
    //     },
    //     restaurant: {
    //         _id: "65e44c37cb8aa54383faa2d2",
    //         name: "Don't Delete",
    //         id: "65e44c37cb8aa54383faa2d2"
    //     },
    //     createdAt: "2024-04-15T11:02:43.840Z",
    //     "__v": 0}]
