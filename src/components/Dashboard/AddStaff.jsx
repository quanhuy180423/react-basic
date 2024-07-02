import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { API_ENDPOINTS } from '../../server/server';

function AddStaff() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        avatar: '',
        createdAt: new Date().toISOString().split('T')[0]
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        else if (formData.name.trim().split(' ').length < 3) tempErrors.name = "Name must have more than 2 words";
        if (!formData.age) tempErrors.age = "Age is required";
        if (!formData.address) tempErrors.address = "Address is required";
        if (!formData.avatar) tempErrors.avatar = "Avatar URL is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post(API_ENDPOINTS.STAFF, formData)
                .then(() => {
                    alert('Staff added successfully');
                    navigate('/dashboard');
                })
                .catch(error => console.error('Error adding staff:', error));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
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
                label="Created Date"
                name="createdAt"
                type="date"
                value={formData.createdAt}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Staff</Button>
        </Box>
    );
}

export default AddStaff;