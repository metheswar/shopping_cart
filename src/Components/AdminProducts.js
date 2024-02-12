import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, Modal, TextField } from '@mui/material';
import Logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Context from '../Store/Context';

const AdminProducts = () => {
    const { products, setProducts,editedProduct, setEditedProduct } = useContext(Context);
    const navigate = useNavigate();


    useEffect(()=>{
        setEditedProduct({})
    },[])

    const handleLogo = () => {
        navigate('/');
    };

    const handleAdd = () => {
        navigate('/addProduct');
    };
    const handleEdit = (product) =>{
        const {id,name,gender,quantity,price,currency,color,imageData} = product
        const formData = {
            id,
            name,
            gender,
            quantity,
            price,
            currency,
            color,
            imageData,
        };
       setEditedProduct(formData)
       navigate('/editProduct')
    }


    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };



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

    const logoStyle = {
        width: '220px',
        height: '50px',
        marginLeft: '20px',
        cursor: 'pointer'
    };

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
    const addButtonStyle = { ...buttonStyle, ...(isSmallScreen && { padding: '6px 12px', fontSize: '0.875rem' }) }

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <img src={Logo} style={logoStyle} alt="Logo" onClick={handleLogo} />
                <Button variant="contained" color="primary" style={addButtonStyle} onClick={handleAdd}>
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
                                        <Button variant="contained" color="primary" size="small" style={editButtonStyle} onClick={()=> handleEdit(product)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDelete(product.id)}>
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

export default React.memo(AdminProducts);