import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
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
        return <p>Loading...</p>;
    }

    return (
        <Container maxWidth="sm">
            <div className="relative text-white h-72">
                <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                />
                <div className="relative z-10 p-6">
                    <h2 className="text-4xl font-bold mb-2">{staff.name}</h2>
                    <p className="text-lg">Age: {staff.age}</p>
                    <p className="text-lg">Address: {staff.address}</p>
                    <p className="text-lg">Created Date: {new Date(staff.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </Container>
    );
}

export default StaffDetail;
