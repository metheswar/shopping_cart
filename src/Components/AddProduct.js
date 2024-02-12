import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, MenuItem, Select, InputLabel, useMediaQuery, Badge } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Logo from '../Assets/Logo.png';
import image from '../Assets/Vector 176.png';
import { alpha } from '@mui/system';
import Context from '../Store/Context';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const {
        name,
        setName,
        gender,
        setGender,
        quantity,
        setQuantity,
        price,
        setPrice,
        currency,
        setCurrency,
        color,
        setColor,
        file,
        setFile,
        products,
        setProducts,
    } = useContext(Context);
    const navigate = useNavigate();
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [error, setError] = useState(false); 

    useEffect(() => {
        setName('');
        setColor('');
        setCurrency('');
        setPrice('');
        setQuantity('');
        setGender('');
        setFile('');
    }, []);

    const handleLogo = () => {
        navigate('/');
    };

    const productButton = () => {
        navigate('/adminProducts');
    };

    const generateUniqueId = () => {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000);
        const uniqueId = `${timestamp}${randomNumber}`;
        return uniqueId;
    };

    const isSmallScreen = useMediaQuery('(max-width:900px)');

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(new Blob([file]));
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        try {
   
            setError(false);

           
            if (!name || !gender || !quantity || !price || !currency || !color || !file) {
                setError(true);
                return;
            }

            const id = generateUniqueId();
            const formData = {
                id,
                name,
                gender,
                quantity,
                price,
                currency,
                color,
                imageData: file ? await fileToBase64(file) : null,
            };

            setProducts([...products, formData]);

            navigate('/adminProducts');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setIsFileSelected(true);
            setFile(e.target.files[0]);
        }
    };

    const labelStyles = {
        color: alpha('#000000', 0.54),
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

    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const footerContainerStyle = {
        borderTop: '1px solid black',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    };

    const logoStyle = {
        width: '220px',
        height: '50px',
        marginLeft: '20px',
        cursor: 'pointer',
    };

    const genderOptions = ['Male', 'Female', 'Unisex'];
    const colorOptions = ['White', 'Black', 'Blue', 'Red'];
    const currencyOptions = ['₹', '$'];

    return (
        <Box sx={boxStyle}>
            <Box sx={logoContainerStyle}>
                <img src={Logo} style={logoStyle} alt="Logo" onClick={handleLogo} />
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
                                    <Badge color="error">*</Badge> Name
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={error && !name}
                                />
                               {error && !name ? ( <Typography color="error">Name is required</Typography>)
                                :(<Typography color="error" style={{ visibility: 'hidden' }}>Name is required</Typography>)}

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="gender-label" sx={labelStyles}>
                                    <Badge color="error">*</Badge> Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    error={error && !gender}
                                >
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && !gender ? ( <Typography color="error">Gender is required</Typography>)
                                 :
                                  (<Typography color="error" style={{ visibility: 'hidden' }}>Gender is required</Typography>
                                )}

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="price-label" sx={labelStyles}>
                                    <Badge color="error">*</Badge> Price
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    error={error && !price}
                                />
                               {error && !price ? (<Typography color="error">Price is required</Typography>)
                                : ( <Typography color="error" style={{ visibility: 'hidden' }}>Price is required</Typography>)}
                                   

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="currency-label" sx={labelStyles}>
                                    <Badge color="error">*</Badge> Currency
                                </InputLabel>
                                <Select
                                    labelId="currency-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    error={error && !currency}
                                >
                                    {currencyOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && !currency ? (<Typography color="error">Currency is required</Typography>)
                                : (
                                     <Typography color="error" style={{ visibility: 'hidden' }}>Currency is required</Typography>
                                    )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="quantity-label" sx={labelStyles}>
                                    <Badge color="error">*</Badge> Quantity
                                </InputLabel>
                                <TextField
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    error={error && !quantity}
                                />
                            {error && !quantity ? (<Typography color="error">Quantity is required</Typography>) 
                            : (<Typography color="error" style={{ visibility: 'hidden' }}>Quantity is required</Typography>)}

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="color-label" sx={labelStyles}>
                                    <Badge color="error">*</Badge> Color
                                </InputLabel>
                                <Select
                                    labelId="color-label"
                                    sx={{ marginBottom: '20px' }}
                                    fullWidth
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    error={error && !color}
                                >
                                    {colorOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && !color ? (<Typography color="error">Color is required</Typography>) 
                                     : (<Typography color="error" style={{ visibility: 'hidden' }}>Color is required</Typography>)}
                            </Grid>
                        </Grid>
                        <label htmlFor="upload-file">
                            <input accept="image/*" id="upload-file" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />} aria-label="upload picture">
                                *Upload
                            </Button>
                            {error && !file ? (<Typography color="error">Image is required</Typography>) : (
                            <Typography color="error" style={{ visibility: 'hidden' }}>Image is required</Typography>)}
                        </label>
                        <Box sx={buttonContainerStyle}>
                            {error ? <Typography color="error">All fields are mandatory</Typography> :
                            <Typography color="error" style={{visibility:'hidden'}}>All fields are mandatory</Typography> }
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {!isSmallScreen && (
                            <Box sx={imageContainerStyle}>
                                <img src={image} className="vector" alt="Vector" />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={footerContainerStyle}>
                <Typography variant="body2">© 2024 All Rights Reserved.</Typography>
                <Typography variant="body2">Privacy Policy</Typography>
            </Box>
        </Box>
    );
};

export default React.memo(AddProduct);
