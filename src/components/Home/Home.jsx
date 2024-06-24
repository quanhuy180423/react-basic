import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { API_ENDPOINTS } from "../../server/server"

function Home() {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        axios.get(API_ENDPOINTS.STAFF)
            .then(response => {
                console.log(response);
                const sortedStaffs = response.data.sort((a, b) => b.age - a.age);
                setStaffs(sortedStaffs);
            })
            .catch(error => console.error('Error fetching staff:', error));
        console.log(API_ENDPOINTS);
    }, []);

    return (
        <Grid container spacing={2}>
            {staffs.map(staff => (
                <Grid item xs={12} sm={6} md={4} key={staff.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={staff.avatar}
                            alt={staff.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {staff.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Age: {staff.age}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Address: {staff.address}
                            </Typography>
                            <Button component={Link} to={`/staff/${staff.id}`}>
                                Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Home;