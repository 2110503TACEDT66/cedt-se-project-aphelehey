// For each row
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { UserAddressItem } from "interfaces";

export default function AddressRow({_id, name}:{_id:string, name:string}) {

    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='right'>{name}</TableCell>
            </TableRow>    
    )
}