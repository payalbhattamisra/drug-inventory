import React, { useEffect, useState } from 'react';

const ManufactureDashboard = () => {
    const [medicinesData, setMedicinesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
    const token = tokenRow ? tokenRow.split('=')[1] : null; // Safe extraction

    useEffect(() => {
        const fetchMedicines = async () => {
            if (!token) {
                setError("User is not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/api/manufactures/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to fetch medicines: ${errorData.message || response.statusText}`);
                }

                const data = await response.json();
                setMedicinesData(data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
                setError('An error occurred while fetching medicines.');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Medicines List</h1>
            <ul>
                {medicinesData.map((medicine) => (
                    <li key={medicine._id}>{medicine.productName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ManufactureDashboard;
