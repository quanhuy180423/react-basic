import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../server/server";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const TablePaginationActions = () => {
    const [staffs, setStaffs] = useState([]);
    const getStaff = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.STAFF);
            setStaffs(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    }

    useEffect(() => {
        getStaff();
    }, [])



    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_ENDPOINTS.STAFF}/${id}`);
            getStaff();
            // alert('Staff deleted successfully');
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },

        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 560,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <Button component={Link} to={`/staff/${params.row.id}`}>View</Button>
                        <Button color="primary" onClick={() => handleDelete(params.row.id)}>Delete</Button>
                        <Button component={Link} to={`/edit-staff/${params.row.id}`}>Edit</Button>
                    </>
                )
            }
        }
    ];

    const rows = staffs;

    return (
        <div style={{ width: '100%' }} >
            <DataGrid rows={rows} columns={columns}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },


                }}
                autoHeight
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div >
    )
}

export default TablePaginationActions