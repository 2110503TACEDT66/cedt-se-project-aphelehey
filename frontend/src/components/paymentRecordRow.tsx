// For each row
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import dayjs from "dayjs";
import { paymentItem } from "interfaces";

export default function PaymentRecordRow({_id, createdAt, price, foods}:{_id:string, createdAt:string, price:number, foods:string[]}) {
    
    const toFormatDate = new Date(createdAt)
    const formattedDate = dayjs(toFormatDate).format('D MMMM YYYY')
    
    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='right'>{foods.map((item, index) => (
                index > 0 ? `, ${item}` : item
            )).join('\n')}</TableCell>
            <TableCell align='right'>{formattedDate}</TableCell>
            <TableCell align='right'>{price}</TableCell>
            </TableRow>    
    )
}