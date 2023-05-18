import React from 'react'
import { useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Logo from '../../assets/logo_1.png'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CustomContainer = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    left: 0,
    height: 60,
    maxWidth: '100%',
    zIndex: 9999,
    backgroundColor: '#F5FAFE',
    borderBottomColor: "#888",
    borderBottomStyle: 'solid',
    borderBottom: 1,
    '&:scrolled': {
        backgroundColor: '#888',
        boxShadow: '-5px 5px 19px -5px rgba(0, 0, 0, 0.08)',
        '-webkit-box-shadow': '-5px 5px 19px -5px rgba(0, 0, 0, 0.08)',
        '-moz-box-shadow': '-5px 5px 19px -5px rgba(0, 0, 0, 0.08)',
    },
}));




const Wrapper = styled(Box)(({ theme }) => ({
    margin: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 0.25,
    py: 1.25

}));



function Navbar() {
    let { user, logoutUser } = useContext(AuthContext)

    return (
        <CustomContainer>
            <Wrapper>
                <Box sx={{ display: 'flex' }}>
                    <Button variant="outlined" size="small" sx={{ my: 1, mx: 1.5, minWidth: 75 }}>Favorites</Button>
                    <Button variant="outlined" size="small" sx={{ my: 1, mx: 1.5 }}>Saved Search</Button>
                </Box>
                <Link to='/' style={{ maxWidth: "10%" }}><img src={Logo} alt="logo" style={{ maxWidth: "100%", objectFit: 'cover' }} /></Link>
                {user ?
                    <>
                        <Box sx={{ display: 'flex' }}>

                            <Button href="/listproperty" variant="contained" color='secondary' sx={{ my: 1, mx: 1.5 }} size="small">
                                List Property
                            </Button>
                            <Button onClick={logoutUser} variant="contained" sx={{ my: 1, mx: 1.5 }} size="small">
                                Logout
                            </Button>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <AccountCircleIcon></AccountCircleIcon>
                                <Link to="/my-profile" style={{ textDecoration: 'none' }}>{`${user.first_name} ${user.last_name}`}</Link>
                            </Box>
                        </Box>
                    </>
                    :
                    <>
                        <Box sx={{ display: 'flex' }}>
                            <Button href="/signin" variant="contained" sx={{ my: 1, mx: 1.5 }} size="small">
                                Login
                            </Button>
                            <Button href="/signup" variant="contained" color='secondary' sx={{ my: 1, mx: 1.5 }} size="small">
                                Signup
                            </Button>
                        </Box>
                    </>
                }
            </Wrapper>
        </CustomContainer>
    );
}

export default Navbar;