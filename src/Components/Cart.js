import React, { useContext, useEffect, useState } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton, Button, Container ,Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Context from '../Store/Context';

const Cart = () => {
    const { cartItems, setCartItems , products, setProducts} = useContext(Context);

    const [alerts,setAlerts] = useState(false)
    const navigate = useNavigate();
    const handleLogo = (e) => {
        navigate('/');
    }

    const [initialCartItems,setInitialCart]= useState(cartItems)

    useEffect(()=>{
            setInitialCart(cartItems)
            console.log(cartItems)
    },[cartItems])

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        marginTop: 'auto',
        transition: 'background-color 0.3s',
        "&:hover": {
            backgroundColor: 'darkgrey',
        }
    };

    const logoStyle = {
        width: '220px',
        height: '50px',
        marginLeft: '20px',
        cursor: 'pointer'
    };

    const containerStyle = {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const headerContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '97%',
        padding: '20px'
    };

    const gridStyle = {
        maxWidth: 1200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    };

    const paperStyle = {
        maxHeight: '70vh',
        overflow: 'auto',
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: theme.spacing(1, 2),
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    let checkoutButtonStyle ={
        margin:'20px auto',
        display:'block',
        marginBottom:'10px !important'
    }

    const handleDelete = (id) => {
        const updatedCartItems = initialCartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
    };

    const shopButtonHandler = () => {
        navigate('/shop')
    }
    const handleQuantityChange = (id, amount) => {
        const updatedCartItems = initialCartItems.map(item => {
            if (item.id === id) {
                const newQuantity = (item.quantity || 0) + amount;
                const product = products.find(product => product.id === id);
                const availableQuantity = product.quantity || 0;
                if(newQuantity > availableQuantity){
                    setAlerts(true);
                    setTimeout(() => {
                        setAlerts(false)
                    }, 5000);
                }
                const updatedQuantity = Math.min(Math.max(newQuantity, 0), availableQuantity);


                if(updatedQuantity > availableQuantity){
                    return null
                }
    
                if (updatedQuantity === 0) {
                    handleDelete(item.id);
                    return null;
                } else {
                    return { ...item, quantity: updatedQuantity };
                }
            }
            return item;
        }).filter(Boolean);
        setCartItems(updatedCartItems);
    };
    

    const convertToRupees = (amount, currency) => {
      if (currency === '₹') {
        return amount;
      }
        const conversionRate = 83.01;
        return Math.ceil(amount * conversionRate);
    };

    const calculateTotal = (items) => {
      let total = 0;
      items.forEach(item => {
        total += convertToRupees(item.price, item.currency) * item.quantity;
      });
      return total;
    };

    const total = calculateTotal(initialCartItems);


    const checkoutHandler = () =>{
if(cartItems.length>0){
    const updatedProducts = [...products];
        cartItems.forEach((item) => {
            const productIndex = updatedProducts.findIndex((product) => product.id === item.id);
            if (productIndex !== -1) {
                const newQuantity = updatedProducts[productIndex].quantity - item.quantity;
                updatedProducts[productIndex] = {
                    ...updatedProducts[productIndex],
                    quantity: Math.max(newQuantity, 0),
                };
            }
        });
        setProducts(updatedProducts);
        setCartItems([]);
}

       
    }
    
    return (
        <Box sx={containerStyle}>
            <Box sx={headerContainerStyle}>
                <img src={Logo} alt="Logo" style={logoStyle} onClick={handleLogo} />
                <Button variant="contained" color="primary" style={buttonStyle} onClick={shopButtonHandler}>Products</Button>
            </Box>
            {alerts ? <Alert  severity="error" style={{ width: '100%', height: '70px',display:'block' }}>
                    You can't exceed the Quantity Limit
                    </Alert> : <Alert  severity="error" style={{visibility:'hidden', width: '100%', height: '70px' ,display:'block'}}>
                    You can't exceed the Quantity Limit
                    </Alert>}
            <Grid container spacing={2} sx={gridStyle}>
                {initialCartItems.length > 0 ? (
                    <>
                        <Grid item xs={12} md={8}>
                            <Paper sx={paperStyle}>
                                <Typography variant="h6" align="center">Cart Items</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Name</StyledTableCell>
                                                <StyledTableCell>Quantity</StyledTableCell>
                                                <StyledTableCell>Price (Dollars)</StyledTableCell>
                                                <StyledTableCell>Price (Rupees)</StyledTableCell>
                                                <StyledTableCell>Delete</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {initialCartItems.map((item) => (
                                                <StyledTableRow key={item.id}>
                                                    <TableCell align="center">{item.name}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        {item.quantity}
                                                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell align="center">{item.currency === '$' ? `$${item.price*item.quantity}` : `-`}</TableCell>
                                                    <TableCell align="center">₹{convertToRupees(item.price,item.currency)*item.quantity}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={() => handleDelete(item.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={paperStyle}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <StyledTableCell>Total</StyledTableCell>
                                                <TableCell align="center">₹{total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                               <Button  variant="contained" sx={checkoutButtonStyle} color="primary" onClick={checkoutHandler}>Checkout</Button>

                            </Paper>

                        </Grid>
                    </>
                ) : (
                    <Typography variant="h6">No products added to cart</Typography>
                )}
            </Grid>
        </Box>
    );
}

export default React.memo(Cart);
