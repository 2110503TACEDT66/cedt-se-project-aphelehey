// For each row
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import dayjs from "dayjs";
import { paymentItem } from "interfaces";

export default function PaymentRecordRow({_id, createdAt, price, name}:{_id:string, createdAt:string, price:number, name:string}) {
    
    const toFormatDate = new Date(createdAt)
    const formattedDate = dayjs(toFormatDate).format('D MMMM YYYY')
    
    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='right'>{formattedDate}</TableCell>
            <TableCell align='right'>{price}</TableCell>
            <TableCell align='right'>{name}</TableCell>
            </TableRow>    
    )
}