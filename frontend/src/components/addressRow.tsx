import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserAddressItem } from "interfaces";

export default function AddressRow({_id, name}:{_id:string, name:string}) {

    const handleEdit = () => {
        // Handle edit functionality here
    }

    const handleDelete = () => {
        // Handle delete functionality here
    }

    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='center'>{name}</TableCell>
            <TableCell align='right'>
                <IconButton onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>    
    )
}
