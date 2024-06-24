import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { API_ENDPOINTS } from '../../server/server';

function Dashboard() {
    const [staffs, setStaffs] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);

    useEffect(() => {
        fetchStaffs();
    }, []);

    const fetchStaffs = () => {
        axios.get(API_ENDPOINTS.STAFF)
            .then(response => setStaffs(response.data))
            .catch(error => console.error('Error fetching staff:', error));
    };

    const handleDelete = (staff) => {
        setStaffToDelete(staff);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        axios.delete(`${API_ENDPOINTS.STAFF}/${staffToDelete.id}`)
            .then(() => {
                fetchStaffs();
                setDeleteDialogOpen(false);
                alert('Staff deleted successfully');
            })
            .catch(error => console.error('Error deleting staff:', error));
    };

    return (
        <div>
            <Button component={Link} to="/add-staff">Add New Staff</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.age}</TableCell>
                                <TableCell>{staff.address}</TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/staff/${staff.id}`}>View</Button>
                                    <Button component={Link} to={`/edit-staff/${staff.id}`}>Edit</Button>
                                    <Button onClick={() => handleDelete(staff)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this staff member?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Dashboard;