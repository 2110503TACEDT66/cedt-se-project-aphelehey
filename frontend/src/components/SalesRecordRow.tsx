// For each row
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import dayjs from "dayjs";
import { paymentItem } from "interfaces";

export default function SalesRecordRow({_id, createdAt, price}:{_id:string, createdAt:string, price:number}) {
    
    const toFormatDate = new Date(createdAt)
    const formattedDate = dayjs(toFormatDate).format('D MMMM YYYY')
    
    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='right'>{formattedDate}</TableCell>
            <TableCell align='right'>{price}</TableCell>
        </TableRow>    
    )
}