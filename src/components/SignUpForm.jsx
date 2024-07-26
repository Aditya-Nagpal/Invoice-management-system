import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FilledInput, FormControl, FormLabel, IconButton, InputAdornment, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
    const navigate=useNavigate();

    const [showPassword, setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    const handleMouseDownConfirmPassword = (e) => {
        e.preventDefault();
    }

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const handleSubmit=async (e) => {
        e.preventDefault();
        e.target.reset();
        const user={name,email,password,confirmPassword};
        try {
            await axios.post('http://localhost:5000/api/user/auth/create-user',user);
            navigate('/login');
        } catch (error) {
            console.log('Error in signing up user',error);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <Box sx={{display: 'flex',flexDirection: 'column', width: '25vw', alignItems: 'center', margin: '20px auto', padding: '20px 0', border: '1px solid lightgray', borderRadius: '10px'}}>
            <FormLabel sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <AccountCircle fontSize='large' />
                <h2 style={{margin: '10px 0 20px'}}> SIGN UP</h2>
            </FormLabel>

            <FormControl sx={{ m: 1, width: '32ch'}} variant='filled'>
                <InputLabel>Name</InputLabel>
                <FilledInput
                    onChange={e => setName(e.target.value)}
                />
            </FormControl>

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
                    id="filled-adornment-password"
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

            <FormControl sx={{ m: 1, width: '32ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                <FilledInput
                    autoComplete='off'
                    onChange={e => setConfirmPassword(e.target.value)}
                    id="filled-adornment-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>

            <Button type='submit' variant='contained' sx={{m: 1}}>Sign Up</Button>
        </Box>
    </form>
  )
}
