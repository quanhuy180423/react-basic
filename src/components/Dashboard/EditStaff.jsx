import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { API_ENDPOINTS } from "../../server/server";

const EditStaff = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        avatar: '',
        createdAt: new Date().toISOString().split('T')[0],
    });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const getStaffById = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.STAFF}/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStaffById();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.name = formData.name ? (formData.name.trim().split(/\s+/).length < 3 ? "Name must have more than 2 words" : "") : "Name is required";
        tempErrors.age = formData.age ? "" : "Age is required";
        tempErrors.address = formData.address ? "" : "Address is required";
        tempErrors.avatar = formData.avatar ? (isValidUrl(formData.avatar) ? "" : "Invalid URL") : "Avatar URL is required";
        tempErrors.createdAt = formData.createdAt ? "" : "Created Date is required";

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.put(`${API_ENDPOINTS.STAFF}/${id}`, formData);
                navigate('/dashboard');
            } catch (error) {
                console.error("Error updating staff:", error);
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
            />
            <TextField
                label="Avatar URL"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                error={!!errors.avatar}
                helperText={errors.avatar}
            />
            <TextField
                label="Created At"
                name="createdAt"
                type="date"
                value={formData.createdAt}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.createdAt}
                helperText={errors.createdAt}
            />
            <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>Update Staff</Button>
        </Box>
    );
};

export default EditStaff;