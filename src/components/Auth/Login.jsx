import { useState } from "react";
import API_ENDPOINTS from "../../server/server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const Login = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(API_ENDPOINTS.STAFF);
            const users = response.data;


            users.map((user) => {
                if (user.userName == formData.userName && user.password == formData.password) {
                    localStorage.setItem("user", JSON.stringify(user));

                    navigate("/");

                } else {
                    setError("Invalid username or password");
                }
            })
        } catch (error) {
            console.error(error);
            setError("An error occurred while logging in. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Box>
                <h1>Login Page</h1>
                <Box display='flex' justifyContent='center' gap={5} component="form" onSubmit={handleSubmit}>
                    <TextField
                        label='User Name'
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Password'
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Box>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
        </>
    );
}

export default Login;
