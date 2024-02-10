import React from 'react';
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import Logo from '../Assets/Logo.png';

const AdminProducts = () => {
    const products = [
        { id: 1, name: 'Product 1', gender: 'Male', price: 100, currency: 'USD', quantity: 10, color: 'Red' },
        { id: 2, name: 'Product 2', gender: 'Female', price: 150, currency: 'USD', quantity: 15, color: 'Blue' },
        { id: 3, name: 'Product 3', gender: 'Other', price: 200, currency: 'USD', quantity: 20, color: 'Green' },
    ];

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        marginTop: 'auto',
        marginRight: '10px',
        transition: 'background-color 0.3s',
        "&:hover": {
            backgroundColor: 'darkgrey',
        },
    };

    const logoStyle={ width: '220px',height:'50px' , marginLeft:'20px' }

    const containerStyle = {
        padding: '20px',
    };

    const tableHeadCellStyle = {
        fontWeight: 'bold',
    };

    const tableRowCellStyle = {
        borderBottom: '1px solid #e0e0e0',
    };

    const actionButtonCellStyle = {
        display: 'flex',
    };

    const editButtonStyle = {
        marginRight: '8px',
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <img src={Logo} alt="Logo" style={logoStyle} />
                <Button variant="contained" color="primary" style={{ ...buttonStyle, ...(isSmallScreen && { padding: '6px 12px', fontSize: '0.875rem' }) }}>
                    Add
                </Button>
            </Box>
            <Container style={containerStyle}>
                <Typography variant="h5" gutterBottom>
                    Product List
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHeadCellStyle}>Name</TableCell>
                                <TableCell style={tableHeadCellStyle}>Gender</TableCell>
                                <TableCell style={tableHeadCellStyle}>Price</TableCell>
                                <TableCell style={tableHeadCellStyle}>Currency</TableCell>
                                <TableCell style={tableHeadCellStyle}>Quantity</TableCell>
                                <TableCell style={tableHeadCellStyle}>Color</TableCell>
                                <TableCell style={tableHeadCellStyle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id} style={tableRowCellStyle}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.gender}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.currency}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.color}</TableCell>
                                    <TableCell style={actionButtonCellStyle}>
                                        <Button variant="contained" color="primary" size="small" style={editButtonStyle}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}

export default AdminProducts;
