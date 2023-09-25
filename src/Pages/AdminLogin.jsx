import React,{useEffect} from 'react'
import Main from '../Components/ForAdminLogin/Main'
import Navbar from '../Components/Common/Navbar'

function AdminLogin() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div > 
       
        <Main />
    </div>
  )
}

export default AdminLogin