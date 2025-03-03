import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signinSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { FaEnvelope, FaLock } from "react-icons/fa"; 
//import {signinimage.png} from '/images/signinimage.png'

export default function SignIn() {
  const [formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=> state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
   try {
     dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data=await res.json();
      if(data.success===false){
       dispatch(signInFailure(data.message));
        return;
      }
     dispatch(signinSuccess(data));
     navigate('/');
   } catch (error) {
     dispatch(signInFailure(error.message));
   }
  }
  return (
    // <div className='p-3 max-w-lg mx-auto'>
    //   <h1 className='text-3xl text-centre font-semibold my-7'>Sign In</h1>
    //   <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
    //     <input type="email" placeholder='email'
    //     className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
    //     <input type="password" placeholder='password' 
    //     className='border p-3 rounded-lg ' id='password' onChange={handleChange}/>
    //     <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
    //       {loading? 'loading':'sign in'}
    //     </button>
    //     <OAuth/>
    //   </form>
    //   <div className='flex gap-2 mt-5'>
    //     <p> Dont have an account?</p>
    //     <Link to={"/sign-up"}>
    //     <span className='text-blue-700'>Sign up</span>
    //     </Link>
    //   </div>
    //   {error&& <p className='text-red-500'>{error}</p>}
    // </div>
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg my-6">
      {/* Logo or Illustration */}
      <div className="flex justify-center my-6">
     <h1 className='text-3xl text-centre font-semibold my-7'>Sign In</h1>
        {/* <img
          src="https://lh3.googleusercontent.com/proxy/9DywRs6-5P9fLcqnJ3IMn5xDmHyYA8Ba-K9Qx7CrVgYfmzaWt0XuLw_Rf2N1BU1Pu_mbH9XyeVhGk9UotFMW60oKTX7iiwLkS3U0i0fwUWKUww" // Replace with your image path
          alt="Sign In"
          className="w-60 h-24"
        /> */}
      </div>

      {/* <h1 className="text-3xl text-center font-semibold my-6">Sign In</h1> */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Email Input */}
        <div className="flex items-center border p-3 rounded-lg bg-gray-50">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none flex-1"
            id="email"
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border p-3 rounded-lg bg-gray-50">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1"
            id="password"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-200"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* OAuth Login */}
        <OAuth />
      </form>

      {/* Sign Up Link */}
      <div className="flex justify-center items-center gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up" className="text-blue-700 hover:underline">
          Sign Up
        </Link>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  )
}

