import { set } from '@cloudinary/url-gen/actions/variable';
import { main } from '@cloudinary/url-gen/qualifiers/videoCodecProfile'
import React, { useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function CreateListing() {
  const [files,setFiles]=useState([]);
  const {currentUser}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const [formData,setformData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:'1',
    bathrooms:'1',
    regularPrice:'1000',
    discountPrice:'0',
    offer:false,
    parking:false,
    furnished:false,
  });
  const [error,setError]=useState(false);
  const [imageUploadError,setImageUploadError]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [loading,setLoading]=useState(false);
  console.log(formData);
  const handleImageSubmit=(e)=>{
    if(files.length>0&& files.length+formData.imageUrls.length<7){
      setUploading(true);
      setImageUploadError(false);
      const promises=[];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      for (let i = 0;i < promises.length;i++) {
        console.log(promises[i]);        
      }
      Promise.all(promises).then((urls)=>{
        setformData({...formData,imageUrls:formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        setImageUploadError('Image upload failed ');
        setUploading(false);
      });
    }
    else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  const storeImage=async(file)=>{
    return new Promise((resolve,reject)=>{
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
        const data= await response.json();
        const url=data.url;
        resolve(url);
      }
      uploadImage(file);
    });
  }
  const handleRemoveImage=(index)=>{
    setformData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
    });
  }
  const handleChange=(e)=>{
      if(e.target.id==='sale'||e.target.id==='rent'){
        setformData({...formData,
          type:e.target.id
        })
      }
      if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
        setformData({
          ...formData,
          [e.target.id]:e.target.checked
        })
      }
      if(e.target.type==='number'||e.target.type==='text'||e.target.type==='textarea'){
        setformData({
          ...formData,
          [e.target.id]:e.target.value
        })
      }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      // if(formData.imageUrls.length<1) 
      // return setError('you must upload at least one image');
      if (formData.imageUrls.length < 1){
        console.log("hii");
        return setError('You must upload at least one image');
      }
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res=await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({...formData,
          userRef :currentUser._id,
      }),
      });
      const data=await res.json();
      setLoading(false);
      if(data.success===false){
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 flex-1'>
              <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength={62} minLength={10} required onChange={handleChange} value={formData.name} />
              <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description}/>
              <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address} />
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type==='sale'} />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type==='rent'} />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                <span>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                <span>furnished</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer}/>
                <span>Offer</span>
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2'>
                  <input type='number' id='bedrooms' min='1' max='10' required
                  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms}/>
                  <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                  <input type='number' id='bathrooms' min='1' max='10' required
                  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms}/>
                  <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                  <input type='number' id='regularPrice' min='1000' max='1000000000' required
                  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice}/>
                  <div className=' flex flex-col items-center'> 
                  <p>Regular price</p>
                  <span className='text-xs'>(&#8377;/month)</span>
                  </div> 
               </div>
               {formData.offer &&
               (
                <div className='flex items-center gap-2'>
                <input type='number' id='discountPrice' min='0' max='10000000000' required
                className='p-3 border border-gray-300 rounded-lg'onChange={handleChange} value={formData.discountPrice} />
                <div className=' flex flex-col items-center'>
                   <p>Discounted price</p>
                   <span className='text-xs'>(&#8377;/month)</span>
                </div>
            </div>
               )}
            </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
              </p>
              <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border-gray-700 rounded uppercase hover: shadow-lg disabled:opacity-80'>{uploading? 'Uploading':'Upload'}</button>
              </div>
              <p className='text-red-700 text-sm'>{imageUploadError&&imageUploadError}</p>
              {/* {
                formData.imageUrls.length>0&&formData.imageUrls.map((url)=>(
                  <img src={url} alt="listing image" className='w-40 h-40 object-cover rounded-lg' />
                ))
              } */}
              {formData.imageUrls?.length > 0 &&
                  formData.imageUrls.map((url, index) => (
                    <div key={url} className='flex justify-between p-3 border items-center'>
                      <img key={url} src={url} alt="listing image" className="w-20 h-20 object-cover rounded-lg" />
                      <button onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                    </div>
                ))
              }

              <button  disabled={loading||uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80  '>{loading? 'Creating...':'Create Listing'}</button>
              {error&&<p className='text-red-700 text-sm'>{error}</p>}
            </div>

        </form>
    </main>
  )
}

export default CreateListing