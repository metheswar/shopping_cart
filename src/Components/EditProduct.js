import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, MenuItem, Select, InputLabel, useMediaQuery } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Logo from '../Assets/Logo.png';
import Context from '../Store/Context';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const {
        products,
        setProducts,
        editedProduct,
        setEditedProduct
    } = useContext(Context);
    const navigate = useNavigate();
    const [editedFields, setEditedFields] = useState({});
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [currencyError, setCurrencyError] = useState(false);
    const [colorError, setColorError] = useState(false);

    useEffect(() => {
        setEditedFields(editedProduct)
    }, [editedProduct]);

    const handleLogo = () => {
        navigate('/');
    };

    const productButton = () => {
        navigate('/adminProducts');
    };

    const handleSubmit = async () => {
        try {
            setNameError(false);
            setGenderError(false);
            setQuantityError(false);
            setPriceError(false);
            setCurrencyError(false);
            setColorError(false);
            let hasError = false;
            if (!editedFields.name) {
                setNameError(true);
                hasError = true;
            }
            if (!editedFields.gender) {
                setGenderError(true);
                hasError = true;
            }
            if (!editedFields.quantity) {
                setQuantityError(true);
                hasError = true;
            }
            if (!editedFields.price) {
                setPriceError(true);
                hasError = true;
            }
            if (!editedFields.currency) {
                setCurrencyError(true);
                hasError = true;
            }
            if (!editedFields.color) {
                setColorError(true);
                hasError = true;
            }

            if (hasError) return;

            const updatedProducts = products.map((product) => {
                if (product.id === editedFields.id) {
                    return editedFields;
                }
                return product;
            });

            setProducts(updatedProducts);
            navigate('/adminProducts');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                setIsFileSelected(true);
                setEditedFields({ ...editedFields, imageData: event.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const logoStyles ={ width: '220px', height: '50px', cursor: 'pointer' }
    const labelStyles = {
        color: 'rgba(0, 0, 0, 0.54)',
    };

    const buttonStyles = {
        backgroundColor: 'black',
        color: 'white',
        marginTop: 'auto',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'darkgrey',
        },
    };

    const boxStyle = {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };

    const logoContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginBottom: 'auto',
    };

    const containerStyle = {
        marginBottom: 'auto',
        padding: '20px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
        marginBottom: '2px',
    };

    const footerStyles={ borderTop: '1px solid black', padding: '20px', display: 'flex', justifyContent: 'space-between' }

    const genderOptions = ['Male', 'Female', 'Other'];
    const colorOptions = ['White', 'Black', 'Blue', 'Red'];
    const currencyOptions = ['₹', '$', '€', '£', '¥'];

    return (
        <Box sx={boxStyle}>
            <Box sx={logoContainerStyle}>
                <img src={Logo} style={logoStyles} alt="Logo" onClick={handleLogo} />
                <Button variant="contained" color="primary" style={buttonStyles} onClick={productButton}>
                    Products
                </Button>
            </Box>
            <Container sx={containerStyle}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="name-label" sx={labelStyles}>
                                    Name
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={editedFields.name || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
                                    error={nameError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="gender-label" sx={labelStyles}>
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={editedFields.gender || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, gender: e.target.value })}
                                    error={genderError}
                                >
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="price-label" sx={labelStyles}>
                                    Price
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    type="number"
                                    value={editedFields.price || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, price: e.target.value })}
                                    error={priceError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="currency-label" sx={labelStyles}>
                                    Currency
                                </InputLabel>
                                <Select
                                    labelId="currency-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={editedFields.currency || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, currency: e.target.value })}
                                    error={currencyError}
                                >
                                    {currencyOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="quantity-label" sx={labelStyles}>
                                    Quantity
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    type="number"
                                    value={editedFields.quantity || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, quantity: e.target.value })}
                                    error={quantityError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="color-label" sx={labelStyles}>
                                    Color
                                </InputLabel>
                                <Select
                                    labelId="color-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={editedFields.color || ''}
                                    onChange={(e) => setEditedFields({ ...editedFields, color: e.target.value })}
                                    error={colorError}
                                >
                                    {colorOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                          
                        </Grid>
                        <label htmlFor="upload-file">
                            <input accept="image/*" id="upload-file" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />} aria-label="upload picture">
                                Upload
                            </Button>
                        </label>
                        <Box sx={buttonContainerStyle}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={footerStyles}>
                <Typography variant="body2">© 2024 All Rights Reserved.</Typography>
                <Typography variant="body2">Privacy Policy</Typography>
            </Box>
        </Box>
    );
};

export default React.memo(EditProduct);
