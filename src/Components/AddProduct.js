import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, useMediaQuery, MenuItem, Select, InputLabel } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Logo from '../Assets/Logo.png';
import image from '../Assets/Vector 176.png';
import { alpha } from '@mui/system';

const AddProduct = () => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [color, setColor] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = () => {};

    const boxStyle = {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    };

    const logoContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginBottom: 'auto'
    };

    const formContainerStyle = {
        marginBottom: 'auto',
        padding: '20px'
    };

    const inputStyle = {
        marginBottom: '20px'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
        marginBottom: '2px'
    };

    const footerContainerStyle = {
        borderTop: '1px solid black',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    };

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        marginTop: 'auto',
        transition: 'background-color 0.3s',
        "&:hover": {
            backgroundColor: 'darkgrey',
        },
    };

    const labelColor = alpha('#000000', 0.54);

    const genderOptions = ['Male', 'Female', 'Other'];

    const colorOptions = ['Red', 'Blue', 'Green', 'Yellow'];
    const logoStyle={ width: '200px',height:'50px' , marginLeft:'10px' }

    return (
        <Box sx={boxStyle}>
            <Box sx={logoContainerStyle}>
                <img src={Logo} style={logoStyle} alt="Logo" />
                <Button variant="contained"  color="primary" style={buttonStyle}>
                    Products
                </Button>
            </Box>
            <Container sx={{ ...formContainerStyle }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="name-label" sx={{ color: labelColor }}>
                                    Name
                                </InputLabel>
                                <TextField
                                    sx={inputStyle}
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="gender-label" sx={{ color: labelColor }}>
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    sx={inputStyle}
                                    fullWidth
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    {genderOptions.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="price-label" sx={{ color: labelColor }}>
                                    Price
                                </InputLabel>
                                <TextField
                                    sx={inputStyle}
                                    fullWidth
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="currency-label" sx={{ color: labelColor }}>
                                    Currency
                                </InputLabel>
                                <TextField
                                    sx={inputStyle}
                                    fullWidth
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="quantity-label" sx={{ color: labelColor }}>
                                    Quantity
                                </InputLabel>
                                <TextField
                                    sx={inputStyle}
                                    fullWidth
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="color-label" sx={{ color: labelColor }}>
                                    Color
                                </InputLabel>
                                <Select
                                    labelId="color-label"
                                    sx={inputStyle}
                                    fullWidth
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                >
                                    {colorOptions.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <label htmlFor="upload-file">
                            <input
                                accept="image/*"
                                id="upload-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <Button variant='contained' color="primary" component="span" startIcon={<PhotoCamera />} aria-label="upload picture">
                                Upload
                            </Button>
                        </label>
                        <Box sx={buttonContainerStyle}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {!isSmallScreen && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={image} className='vector' alt="Vector" />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={footerContainerStyle}>
                <Typography variant="body2">
                    © 2024 All Rights Reserved.
                </Typography>
                <Typography variant="body2">
                    Privacy Policy
                </Typography>
            </Box>
        </Box>
    );
}

export default AddProduct;
