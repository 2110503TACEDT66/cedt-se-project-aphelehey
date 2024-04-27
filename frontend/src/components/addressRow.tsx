import { TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import deleteAddress from "@/libs/deleteAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AddressRow({_id, name}:{_id:string, name:string}) {

    let token = ""; // Initialize token as an empty string

    try {
        const session = await getServerSession(authOptions);
        token = session?.user.token || ""; // Assign token from session or an empty string if session is undefined
    } catch (error: any) {
        console.error("Error retrieving session:", error);
    }
    
    const handleDelete = async () => {
        try {
            if (!token) {
                throw new Error("User not authenticated or token unavailable.");
            }
            await deleteAddress(token, _id);
            console.log("Address deleted successfully");
        } catch (error: any) {
            console.error("Failed to delete address:", error.message);
        }
    }

    return (
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell align='center'>{name}</TableCell>
            <TableCell align='right'>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>    
    )
}
