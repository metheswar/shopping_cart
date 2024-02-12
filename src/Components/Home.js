import React, { useContext, useEffect } from 'react';
import { Box, Paper, Checkbox, Container, Grid, Typography, Button, useMediaQuery } from '@mui/material';
import Logo from '../Assets/Logo.png';
import image from '../Assets/Vector 176.png'
import './Home.css';
import Context from '../Store/Context';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const {isUserChecked, setIsUserChecked,isAdminChecked, setIsAdminChecked} = useContext(Context)
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate()


  useEffect(()=>{
    setIsAdminChecked(false)
    setIsUserChecked(false)
    navigate('/')
  },[])

  const handleAdminCheckboxChange = (event) => {
    setIsAdminChecked(event.target.checked);
if(event.target.checked){
  navigate('/addProduct')
}
    setIsUserChecked(false);
  };

  const handleUserCheckboxChange = (event) => {
    setIsUserChecked(event.target.checked);
    if(event.target.checked){
      navigate('/shop')
    }
    setIsAdminChecked(false);
  };

  const handleLogo = (e)=>{
    navigate('/')
  }
  const boxStyle = {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const logoContainerStyle = {
    display: 'flex',
    padding: '20px',
    marginBottom: 'auto'
  };

  const containerStyle = {
    marginBottom: 'auto'
  };

  const paperStyle = {
    p: 2,
    mb: 2
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
    marginBottom: '2px'
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const footerContainerStyle = {
    padding: '20px',
    textAlign: 'space-between',
    marginTop: 'auto',
    display: 'flex',
    borderTop: '1px solid black',
    justifyContent: 'space-between'
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={logoContainerStyle}>
        <img src={Logo} className='logo_img' alt="Logo" onClick={handleLogo} />
      </Box>
      <Container sx={containerStyle}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Paper sx={paperStyle}>
                <Box sx={checkboxContainerStyle}>
                  <Checkbox checked={isAdminChecked} onChange={handleAdminCheckboxChange} />
                  Admin
                </Box>
              </Paper>
              <Paper sx={paperStyle}>
                <Box sx={checkboxContainerStyle}>
                  <Checkbox checked={isUserChecked} onChange={handleUserCheckboxChange} />
                  User
                </Box>
              </Paper>
            </Box>
          </Grid>
          {!isSmallScreen && (
            <Grid item xs={12} md={6}>
              <Box sx={imageContainerStyle}>
                <img src={image} className='vector' alt="Vector" />
              </Box>
            </Grid>
          )}
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
};

export default React.memo(Home);
