import { Box, Grid, TextField, Typography, Button, FormControl, OutlinedInput, InputLabel, IconButton, InputAdornment } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { request } from '../../utils/fetchAPI'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'





const Profile = () => {

    let { authRequest, user } = useContext(AuthContext)
    const [error, setError] = useState(false)
    const [state, setState] = useState({})


    const handleState = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    console.log(state)

    const handleProfileChange = async (e) => {
        e.preventDefault()

        try {

            const headers = {
                "Content-Type": "application/json",
            }

            const data = await authRequest(`api/update-profile`, "PUT", headers, { ...state })
            alert('Profile information updated successfully')
            window.location.reload()

        } catch (error) {
            alert('Something went wrong :(')
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
            console.error(error)
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
        }}>
            <Box component="form" onSubmit={handleProfileChange} noValidate sx={{
                display: 'flex',
                width: '40%',
                maxHeight: '60%',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                alignItems: 'center',
                my: '50px',
                flexDirection: 'column',
            }}>
                <Typography variant='h6'>Update Profile</Typography>
                <Grid item xs={12} sm={6} m='10px'>
                    <Typography>First Name</Typography>
                    <TextField
                        autoComplete="given-name"
                        name="first_name"
                        id="firstName"
                        label={user.first_name}
                        autoFocus
                        onChange={handleState}
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12} sm={6} m='10px'>
                    <Typography>Last Name</Typography>
                    <TextField
                        id="lastName"
                        label={user.last_name}
                        name="last_name"
                        autoComplete="family-name"
                        onChange={handleState}
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12} m='10px'>
                    <Typography>Username</Typography>
                    <TextField
                        id="username"
                        label={user.username}
                        name="username"
                        autoComplete="username"
                        onChange={handleState}
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12} m='10px'>
                    <Typography>Mobile Phone Number</Typography>
                    <TextField
                        id="phoneNumber"
                        label={user.mobile}
                        name="mobile"
                        type="tel"
                        autoComplete="tel"
                        onChange={handleState}
                        variant='standard'
                    />
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>
            </Box>
            <Box component="form" onSubmit={handleProfileChange} noValidate={false} sx={{
                display: 'flex',
                width: '40%',
                maxHeight: '40%',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                alignItems: 'center',
                my: '50px',
                flexDirection: 'column',
            }} >
                <Typography variant='h6'>Change Password</Typography>
                <Grid item xs={12} m='20px'>
                    <FormControl fullWidth required name="current_password" variant="outlined" onChange={handleState}>
                        <InputLabel name="current_password" label="newPassword" type="password" id="password">Current Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="current_password"
                            variant='standard'
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} m='20px'>
                    <FormControl fullWidth required name="new_password" variant="outlined" onChange={handleState}>
                        <InputLabel name="new_password" label="newPassword" type="password" id="password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="new_password"
                            variant='standard'
                        />
                    </FormControl>
                </Grid>
                <Button
                    type="submit"
                    color='secondary'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Change
                </Button>
            </Box>
        </Box>
    )
}

export default Profile