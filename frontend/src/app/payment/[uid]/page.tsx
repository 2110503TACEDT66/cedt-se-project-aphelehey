'use server'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getPaymentRecords from '@/libs/getPaymentRecords';
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

    //mock data
    let shops = [ {
        _id: "661d0bd3b876c31024b8d5bd",
        user: "6618f624ebcf2d9a9686f108",
        food: [
            "pizza",
            "sushi",
            "water"
        ],
        price: 400,
        payment: true,
        location: {
            "address": "String",
            "district": "String",
            "province": "String",
            "postalcode": "String",
            "region": "String",
            "_id": "661d0953a295892c8c22f0f6"
        },
        restaurant: {
            _id: "65e44c37cb8aa54383faa2d2",
            name: "Don't Delete",
            id: "65e44c37cb8aa54383faa2d2"
        },
        createdAt: "2024-04-15T11:02:43.840Z",
        "__v": 0}]


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
                                    <TableCell>{payment._id}</TableCell>
                                    <TableCell>{payment.createdAt}</TableCell>
                                    <TableCell>{payment.price}</TableCell>
                                    <TableCell>{payment.restaurant.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    )
}