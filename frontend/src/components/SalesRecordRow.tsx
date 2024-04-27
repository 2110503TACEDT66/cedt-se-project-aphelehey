// For each row
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import dayjs from "dayjs";
import { paymentItem } from "interfaces";

export default function SalesRecordRow({_id, createdAt, price,foods}:{_id:string, createdAt:string, price:number,foods:string[]}) {
    
    const toFormatDate = new Date(createdAt)
    const formattedDate = dayjs(toFormatDate).format('D MMMM YYYY')
    const foodString = foods.join(', ');
    return (
        <TableRow>
            <TableCell align='left'>{_id}</TableCell>
            <TableCell align='left'>{foodString}</TableCell>
            <TableCell align='center'>{formattedDate}</TableCell>
            <TableCell align='center'>{price}</TableCell>
        </TableRow>    
    )
}