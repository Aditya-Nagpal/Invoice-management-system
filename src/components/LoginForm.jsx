import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FilledInput, FormControl, FormLabel, IconButton, InputAdornment, InputLabel } from '@mui/material';
import React, { useState } from 'react'

export default function LoginForm() {
    const [showPassword,setShowPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=(e) => {
        e.prevetDefault();
        const user={email,password};
        console.log(user);
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

            <Button type='submit' variant='contained' sx={{m: 1}}>Submit</Button>
        </Box>
    </form>
  )
}
