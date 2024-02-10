import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import Logo from '../Assets/Logo.png';

const ShoppingPage = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 100, image: '' },
        { id: 2, name: 'Product 2', price: 150, image: '' },
        { id: 3, name: 'Product 3', price: 200, image: '' },
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

    const paperStyle = {
        textAlign: 'center',
        color: '#000',
        padding: '12px',
        marginBottom: '8px',
        borderRadius: '12px',
        maxWidth: '300px', 
        height: '300px', 
      
    };

    const logoStyle = {
        width: '220px',
        height: '50px',
        marginLeft: '20px'
    };

    return (
        <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', maxHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <img src={Logo} alt="Logo" style={logoStyle} />
                <Button variant="contained" color="primary" style={buttonStyle}>
                    Cart
                </Button>
            </Box>
            <Container>
                <Typography variant="h5" gutterBottom>
                    Shop Now
                </Typography>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Paper elevation={10} sx={paperStyle}> 
                                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    ${product.price}
                                </Typography>
                                <Button>Add to Cart</Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default ShoppingPage;
