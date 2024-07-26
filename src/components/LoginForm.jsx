import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FilledInput, FormControl, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, Link } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate=useNavigate();

    const [showPassword,setShowPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=async (e) => {
        e.preventDefault();
        const user={email,password};
        try {
            const res=await axios.post('http://localhost:5000/api/user/auth/create-session',user);
            localStorage.setItem('jwt-token',res.data.token);
            navigate('/');
        } catch (error) {
            console.log('Error in logging in user.',error);
        }
        e.target.reset();
    }

  return (
    <form onSubmit={handleSubmit}>
        <Box sx={{display: 'flex',flexDirection: 'column', width: '25vw', alignItems: 'center', margin: '20px auto', padding: '20px 0', border: '1px solid lightgray', borderRadius: '10px'}}>
            <FormLabel sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <AccountCircle fontSize='large' />
                <h2 style={{margin: '10px 0 20px'}}>LOGIN</h2>
            </FormLabel>

            <FormControl sx={{ m: 1, width: '32ch'}} variant='filled'>
                <InputLabel>Email</InputLabel>
                <FilledInput
                    onChange={e => setEmail(e.target.value)}
                    type='email'
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: '32ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    autoComplete='off'
                    onChange={e => setPassword(e.target.value)}
                    id="filled-adornment-password-2"
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
                />
            </FormControl>

            <FormHelperText variant='outlined' sx={{my: 1.5}}><Link href='/sign-up' sx={{'&:hover': {color: 'red'}, letterSpacing: '-0.05em'}} fontSize={16} fontWeight='bold' underline='none'>Don't have an account?</Link></FormHelperText>

            <Button type='submit' variant='contained' sx={{m: 1}}>Submit</Button>
        </Box>
    </form>
  )
}
