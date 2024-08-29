import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import axios from 'axios';

export default function AddInvoiceForm({close,costumerId,updateUser}) {
    const [invoiceDate,setInvDate]=useState(null);
    const [dueDate,setDueDate]=useState(null);
    const [billTo,setBillTo]=useState('');
    const [invoiceNumber,setInvoiceNumber]=useState(0);
    const [amount,setAmount]=useState(0);

    const postInvoice=async (invoice) => {
        try {
            const res=await axios.post('http://localhost:5000/api/invoice/create',invoice,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
                }
            })
            updateUser(JSON.stringify(res.data.costumer));
        } catch (error) {
            console.log('Error in posting invoice',error);
        }
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        const invoice={invoiceNumber,costumerId,amount,invoiceDate,dueDate,billTo,status: 'unpaid'}
        postInvoice(invoice);
        e.target.reset();
        close();
    }

  return (
    <main style={{backgroundColor: 'black', opacity: 0.6, height: '100vh', width: '100%', position: 'fixed', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '45vw', backgroundColor: 'white', padding: '20px 20px', position: 'relative'}}>
            <IconButton onClick={close} aria-label="close" sx={{position: 'absolute', right: '10px', top: '10px'}}>
                <CloseIcon />
            </IconButton>
            <Typography variant='h3' sx={{textTransform: 'uppercase', fontWeight: 500, marginBottom: '30px'}}>invoice</Typography>
            <form onSubmit={handleSubmit}>
                <Box>
                    <FormControl fullWidth sx={{width: '100%', display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginBottom: '2rem'}} >
                        <TextField
                            autoComplete='off'
                            type='number'
                            label='Invoice Number'
                            InputLabelProps={{shrink: true}}
                            onChange={e => setInvoiceNumber(e.target.value)}
                            required
                        />

                        <TextField
                            label='Amount'
                            type='number'
                            InputLabelProps={{shrink: true}}
                            InputProps={{startAdornment: <InputAdornment position='start'>₹</InputAdornment>}}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: '2rem'}}>
                        <TextField
                            autoComplete='off'
                            label='Bill To'
                            InputLabelProps={{shrink: true}}
                            onChange={e => setBillTo(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl sx={{width: '100%', display: 'flex', flexDirection: 'row', marginBottom: '2rem', justifyContent: 'space-between'}}>
                        <TextField 
                            type='date' 
                            label='Invoice Date'
                            InputLabelProps={{shrink: true}}
                            onChange={e => setInvDate(e.target.value)}
                            required
                        />
                        <TextField 
                            type='date' 
                            label='Due Date' 
                            InputLabelProps={{shrink: true}}
                            onChange={e => setDueDate(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: '0rem'}}>
                        <Button type='submit' variant='contained'>Add Invoice</Button>
                    </FormControl>
                </Box>
            </form>
        </div>
    </main>
  )
}
