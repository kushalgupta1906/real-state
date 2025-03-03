import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { use } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateUserStart,updateUserFailure,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess ,
  signOutUserFailure,signOutUserStart,signOutUserSuccess
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
//import dotenv from 'dotenv';
//dotenv.config();
//import { uploadOnCloudinary } from '../../../backend/cloudinary.js';
//import { uploadOnCloudinary } from '../../cloudinary';
function Profile() {
  const fileRef=useRef(null);
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined)
  const [formData,setformData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [showListingsError,setShowListingsError]=useState(false);
  const [userListings,setUserListings]=useState([]);
  const dispatch=useDispatch();
 // console.log(formData)
  //console.log(file);
  useEffect(() => {
    if (file) {
      const upload = async () => {
        const result = await uploadImage(file);
        console.log(result.url);
        setformData({...formData,avatar:result.url});
        console.log("hii");
        console.log(formData)
       // console.log(result.url);
        //setImageUrl(result.secure_url);
        //console.log("Uploaded Image URL:", result.secure_url);
      };
      upload();
    }
  }, [file]);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    //console.log(formData);
    formData.append("upload_preset", "images_preset"); // Configure in Cloudinary settings
    //console.log(formData)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dne8fofeo/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
//   const formData = new FormData();
// formData.append("file", file);
// formData.append("upload_preset", "your-upload-preset");

// fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
//   method: "POST",
//   body: formData, // No need to set Content-Type; it will be set automatically
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

  
     return response.json();
   };
  //const handleFileUpload = async (event) => {
    // useEffect(async(file)=>{
    //   //const file = event.target.files[0];
    //   if (file) {
    //   const result = await uploadImage(file);
    //   //console.log("Uploaded Image URL:", result.secure_url);
    //   }
    // },[file]);
    //const ImageUploader = () => {
      //const [file, setFile] = useState(null);
     // const [imageUrl, setImageUrl] = useState("");
    
 
    // const file = event.target.files[0];
    // if (file) {
    //   const result = await uploadImage(file);
    //   console.log("Uploaded Image URL:", result.secure_url);
    // }
  //};
  
  
  //console.log(file);
 // const uploadFile=async(type)=>{
    //const data=new FormData();
   // data.append("file,img");
   // data.append("upload_preset",images_preset);
  //   try {
  //     let cloudName=process.env.CLOUDINARY_CLOUD_NAME;
  //     let resourceType='image';
  //     let api=`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  //     const res=await axios.post(api,data);
  //     const {secure_url}=res.data;
  //     console.log(secure_url);
  //     return secure_url;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(async ()=>{
  //   if(file){
  //     const imgUrl= await uploadFile('image');
  //     await axios.post(`${process.env.BASE_URL}/api/images`,{imgUrl});
  //     setFile(null);
  //   }
  //},[file]);
  // const handeleChange=(e)=>{
  //   setformData({...formData,[e.target.id]:e.target.value});
  // };
  // const handleSubmit= async (e)=>{
  //   e.preventDefault();
  //   try {
  //     dispatch(updateUserStart());
  //     const res=await fetch(`/api/user/update/${currentUser._id}`,{
  //       method:'POST',
  //       headers:{
  //         'Content-Type':"application/json",
  //       },
  //       body:JSON.stringify(formData),
  //     });
  //     const data=await res.json();
  //     if(data.success===false){
  //       dispatch(updateUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(updateUserSuccess(data));
  //   } catch (error) {
  //     dispatch(updateUserFailure(error.message));
  //   }
//};
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log("bhai");
      console.log(formData.avatar);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleShowListings=async()=>{
    try {
      setShowListingsError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data=await res.json();
      if(data.success===false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
    
  };
  const handleListingDelete=async(listingId)=>{
    try {
      const res=await fetch(`/api/listing/delete/${listingId}`,{
       method:'DELETE', 
      });
      const data=await res.json();
      if(data.success===false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'  />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2' />
        <input type="text" placeholder='username' defaultValue={currentUser.username} id='username'
        className='border p-3 rounded-lg'onChange={handleChange} />
        <input type="text" placeholder='email' defaultValue={currentUser.email} id='email'
        className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="text" placeholder='password' defaultValue={currentUser.password} id='password'
        className='border p-3 rounded-lg'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Update'}</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
        CREATE LISTING
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess?'User is updated successfully':''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError?'Error showing listings':''}</p>
      {userListings&&
      userListings.length>0&&
        <div className='flex flex-col gap-4' >
          <h1 className='text-center mt-7 text-2xl font-semibold'>your listing</h1>
             {userListings.map((listing)=> (
        <div key={listing._id} 
        className='border rounded-lg p-3 flex justify-between items-center gap-4'>
          <Link to={`/listing/${listing._id}`}>
          <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt="listing image" />
          </Link>
          <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
          <p >{listing.name}</p>
          </Link>
          <div className='flex flex-col items-center'>
              <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase'>Edit</button>
              </Link>
              
          </div>
        </div>
      ))}
        </div>
  }
    </div>
  );  
}

export default Profile
