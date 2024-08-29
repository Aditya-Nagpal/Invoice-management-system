import { Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import HomeHeader from '../components/HomeHeader';
import AddIcon from '@mui/icons-material/Add';
import AddInvoiceForm from '../components/AddInvoiceForm';
import { Typography } from '@mui/joy';

export default function Home() {
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem('jwt-token') === null){
      navigate('/login');
    }
  },[]);

  const [isLoading,setIsLoading]=useState(false);
  const [token,setToken]=useState('');
  const [user,setUser]=useState({});
  const [invoices,setInvoices]=useState([]);

  const [showAddForm,setShowAddForm]=useState(false);

  const fetchUser=async () => {
    try {
      setIsLoading(true);
      setToken(localStorage.getItem('jwt-token'));
      const res=await fetch('http://localhost:5000/api/user/get-profile',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
      });
      const data=await res.json();
      setUser(data.user);
      setInvoices(data.user.invoices);
      setIsLoading(false);
    } catch (error) {
      console.log('JWT error',error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('jwt-token'));
    fetchUser();
  },[]);

  useEffect(() => {
    // console.log(user.invoices);
    setInvoices(user.invoices);
  },[user]);

  return (
    <>
      {
        isLoading ? (
          <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><PuffLoader /></div>
        ) : (
          <main>
            <HomeHeader resetStates={() => {setToken('');setUser({})}} />
            <Button 
              variant='contained' 
              color='primary' 
              size='large' 
              endIcon={<AddIcon />} 
              sx={{margin: '20px'}}
              onClick={() => setShowAddForm(true)}
            >
              Add Invoice
            </Button>
            <hr></hr>
            {
              showAddForm ? (
                <AddInvoiceForm close={() => setShowAddForm(false)} costumerId={user._id} updateUser={(user) => setUser(JSON.parse(user))} />
              ) : null
            }
            <List sx={{margin: 0, padding: '0px 20px'}}>
              <Typography level='h2' sx={{color: 'darkgrey'}}>Invoices</Typography>
              {
                invoices && invoices.map((invoice,index) => (
                  <ListItem key={index}>{invoice}</ListItem>
                ))
              }
            </List>
          </main>
        )
      }
    </>
  )
}
