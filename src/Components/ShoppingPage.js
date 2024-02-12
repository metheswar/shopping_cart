import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, TextField, Alert } from '@mui/material';
import Logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Context from '../Store/Context';

const ShoppingPage = () => {
    const { products, cartItems, setCartItems } = useContext(Context);
    const [alerts, setAlerts] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(new Map());

    const navigate = useNavigate();

    useEffect(() => {
        const cartMap = new Map();
        cartItems.forEach(item => {
            cartMap.set(item.id, item.quantity);
        });
        setSelectedQuantity(cartMap);
    }, [cartItems]);

    const handleLogo = () => {
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (productId) => {
        const existingCartItemIndex = cartItems.findIndex(item => item.id === productId);
        const product = products.find(item => item.id === productId);

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            const quantity = 1;
            const newItem = { ...product, quantity };
            setCartItems([...cartItems, newItem]);
        }

        setSelectedQuantity(prevState => {
            const newSelectedQuantity = new Map(prevState);
            newSelectedQuantity.set(productId, (newSelectedQuantity.get(productId) || 0) + 1);
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

            if (newQuantity > availableQuantity) {
                setAlerts(true);
                setTimeout(() => {
                    setAlerts(false)
                }, 5000);
            }

            const updatedQuantity = Math.min(Math.max(newQuantity, 0), availableQuantity);
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

    const checkOutOfStock = (quantity) => {
        return quantity === 0;
    }

    const checkQuantity = (product) => {
        const cartQuantity = selectedQuantity.get(product.id);
        if (cartQuantity && cartQuantity === product.quantity) {
            return false
        }
        else {
            return true;
        }
    }

    const navigateToCart = () => {
        navigate('/cart');
    };

    return (
        <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <img src={Logo} alt="Logo" style={{ width: '220px', height: '50px', marginLeft: '20px', cursor: 'pointer' }} onClick={handleLogo} />
                <Button variant="contained" color="primary" style={{ backgroundColor: 'black', color: 'white', marginTop: 'auto', marginRight: '10px', transition: 'background-color 0.3s', "&:hover": { backgroundColor: 'darkgrey' } }} onClick={navigateToCart}>
                    Cart
                </Button>
            </Box>
            <Container>
                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                    sx={{ margin: '25px' }}
                />
                <Grid container spacing={3}>
                    {alerts ? <Alert severity="error" style={{ width: '100%', height: '70px', display: 'block' }}>You can't exceed the Quantity Limit</Alert>
                        : <Alert severity="error" style={{ width: '100%', height: '70px', display: 'block', visibility: 'hidden' }}>You can't exceed the Quantity Limit</Alert>}
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Paper elevation={10} style={{ textAlign: 'center', color: '#000', padding: '20px', marginBottom: '20px', borderRadius: '12px', maxWidth: '300px', height: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', "&:hover": { transform: 'scale(1.05)', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)' } }}>
                                <img src={product.imageData} alt={product.name} style={{ maxWidth: '100%', maxHeight: '200px', width: 'auto', objectFit: 'cover', marginBottom: '15px', borderRadius: '8px' }} />
                                <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>{product.name}</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" gutterBottom><strong>Gender:</strong> {product.gender}</Typography>
                                        <Typography variant="body2" gutterBottom><strong>Color:</strong> {product.color}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" gutterBottom>
                                            {checkOutOfStock(product.quantity) ? (
                                                <span style={{ color: 'red' }}>Out of Stock</span>
                                            ) : (
                                                <strong>Quantity Left: {product.quantity}</strong>
                                            )}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom><strong>Price:</strong> {product.currency}{product.price}</Typography>
                                    </Grid>
                                </Grid>
                                {!checkOutOfStock(product.quantity) && <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
                                    {(!selectedQuantity.get(product.id) && checkQuantity(product)) &&
                                        <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>}
                                    {selectedQuantity.get(product.id) && checkQuantity(product) && (
                                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                                            <Button onClick={() => handleQuantityChange(product.id, -1)}> - </Button>
                                            <Typography variant="body1" style={{ margin: '0 10px' }}>{selectedQuantity.get(product.id)}</Typography>
                                            <Button onClick={() => handleQuantityChange(product.id, 1)}> + </Button>
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
