import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, TextField } from '@mui/material';
import Logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Context from '../Store/Context';

const ShoppingPage = () => {
    const { products, setProducts, cartItems, setCartItems } = useContext(Context);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(new Map());

    const handleLogo = () => {
        navigate('/');
    };

    useEffect(()=>{
        const newCartItem = cartItems.filter((item)=>item.quantity !== 0)
        setCartItems(newCartItem)
    },[cartItems])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const logoStyles = {
        width: '220px',
        height: '50px',
        marginLeft: '20px',
        cursor: 'pointer'
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

    const paperStyle = {
        textAlign: 'center',
        color: '#000',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '12px',
        maxWidth: '300px',
        height: 'auto',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        "&:hover": {
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
        },
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '200px',
        width: 'auto',
        objectFit: 'cover',
        marginBottom: '15px',
        borderRadius: '8px',
    };

    const boxStyle = {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        padding: '20px',
    };

    const containerStyle = {
        marginBottom: 'auto',
    };

    const logoContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const incrementDecrementStyles = { display: 'flex', alignItems: 'center' }

    const cartButtonStyles ={ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }

    const cartButtonHandler = () => {
        navigate('/cart');
    };

    const decodeBase64Image = (data) => {
        if (!data) return '';
        return `${data}`;
    };

    const handleAddToCart = (productId) => {
        const quantity = (selectedQuantity.get(productId) || 0) + 1;
        const existingCartItemIndex = cartItems.findIndex(item => item.id === productId);
    
        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            const item = products.find(product => product.id === productId);
            const newItem = { ...item, quantity };
            setCartItems([...cartItems, newItem]);
        }
    
        setSelectedQuantity(prevState => {
            const newSelectedQuantity = new Map(prevState);
            newSelectedQuantity.set(productId, quantity);
            return newSelectedQuantity;
        });
    };
    

    const handleQuantityChange = (productId, amount) => {
        setSelectedQuantity(prevState => {
            const newSelectedQuantity = new Map(prevState);
            const currentQuantity = newSelectedQuantity.get(productId) || 0;
            const newQuantity = currentQuantity + amount;

            const product = products.find(product => product.id === productId);
            const availableQuantity = product.quantity || 0;
    
 
            const updatedQuantity = Math.min(Math.max(newQuantity, 0), availableQuantity);
            if(updatedQuantity > availableQuantity){
                return availableQuantity
            }
            if (updatedQuantity === 0) {
                newSelectedQuantity.delete(productId);
            } else {
                newSelectedQuantity.set(productId, updatedQuantity);
            }
    
            const itemIndex = cartItems.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[itemIndex].quantity = updatedQuantity;
                setCartItems(updatedCartItems);
            }
    
            return newSelectedQuantity;
        });
    };

    const checkOutOfStock =(quantity)=>{

        if(quantity === 0){
            return true
        }else{
            return false
        }

    }
    
    

    return (
        <Box sx={boxStyle}>
            <Box sx={logoContainerStyle}>
                <img src={Logo} alt="Logo" style={logoStyles} onClick={handleLogo} />
                <Button variant="contained" color="primary" style={buttonStyle} onClick={cartButtonHandler}>
                    Cart
                </Button>
            </Box>
            <Container sx={containerStyle}>
                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                    sx={{margin:'25px'}}
                />
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Paper elevation={10} sx={paperStyle}>
                                <img src={decodeBase64Image(product.imageData)} alt={product.name} style={imageStyle}/>
                                <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Gender:</strong> {product.gender}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Color:</strong> {product.color}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" gutterBottom>
                                        {checkOutOfStock(product.quantity) ? (
                                            <span style={{color:'red'}}>Out of Stock</span>
                                        ) : (
                                            <strong>Quantity Left: {product.quantity}</strong>
                                        )}

                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Price:</strong> {product.currency}{product.price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                    {!checkOutOfStock(product.quantity) &&                                 <Box sx={cartButtonStyles}>
                                  {!selectedQuantity.get(product.id) &&   
                                  <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>
                                        Add to Cart
                                    </Button>}
                                    {selectedQuantity.get(product.id) && (
                                        <Box sx={incrementDecrementStyles}>
                                            <Button onClick={() => handleQuantityChange(product.id, -1)} >
                                                -
                                            </Button>
                                            <Typography variant="body1" style={{ margin: '0 10px' }}>
                                                {selectedQuantity.get(product.id)}
                                            </Typography>
                                            <Button onClick={() => handleQuantityChange(product.id, 1)}>
                                                +
                                            </Button>
                                        </Box>
                                    )}
                                </Box>}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default React.memo(ShoppingPage);
