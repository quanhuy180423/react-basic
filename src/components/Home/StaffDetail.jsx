import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { API_ENDPOINTS } from '../../server/server'; // Adjust the import path as needed

function StaffDetail() {
    const [staff, setStaff] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API_ENDPOINTS.STAFF}/${id}`)
            .then(response => {
                setStaff(response.data);
                console.log(response)
            })
            .catch(error => console.error('Error fetching staff details:', error));
    }, [id]);

    if (!staff) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={staff.avatar}
                    alt={staff.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {staff.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Age: {staff.age}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Address: {staff.address}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Created Date: {new Date(staff.createdAt).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default StaffDetail;