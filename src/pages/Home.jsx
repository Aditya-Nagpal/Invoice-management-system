import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import HomeHeader from '../components/HomeHeader';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function Home() {
  const navigate=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
  const [isInvoicesLoaded,setIsInvoicesLoaded]=useState(false);
  const [token,setToken]=useState('');
  const [user,setUser]=useState({});
  const [invoices,setInvoices]=useState([]);

  const fetchUser=async () => {
    try {
      setIsLoading(true);
      setToken(localStorage.getItem('jwt-token'));
      const res=await fetch('http://localhost:5000/api/user/get-profile',{
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
      });
      const data=await res.json();
      setUser(data.user);
      setIsLoading(false);
    } catch (error) {
      console.log('JWT error',error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('jwt-token'));
    fetchUser();
  },[]);

  // const fetchInvoices=async () => {
  //   try {
  //     console.log(user._id);
  //     const res=await fetch(`http://localhost:5000/api/invoice/fetch-all/${user._id}`);
  //     const data=await res.json();
  //     console.log(data.allInvoices)
  //     setInvoices(data.allInvoices);
  //   } catch (error) {
  //     console.log('Error in fetching invoices',error);
  //   }
  // }

  useEffect(() => {
    // fetchInvoices();
    console.log(user)
  },[user])

  const emptyToken= () => {setToken('');};

  return (
    <>
      {
        isLoading ? (
          <div style={{width: '100%',height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><PuffLoader /></div>
        ) : (
          <main>
            <HomeHeader emptyToken={emptyToken} />
            <Button variant='contained' color='primary' size='large' endIcon={<AddIcon />} sx={{margin: '20px 0'}}>Add Invoice</Button>
            
          </main>
        )
      }
    </>
  )
}
