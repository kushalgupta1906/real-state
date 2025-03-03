import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useSelector  } from 'react-redux'
import { useEffect } from 'react'

function Header() {
  const {currentUser}=useSelector(state=>state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  //console.log(currentUser)
  //if(currentUser)
 // console.log(currentUser.avatar)
  //https://lh3.googleusercontent.com/a/ACg8ocK1c59Vg4DQ4T4fmizht285Z-bx8Id9zWBbzJ5RJt0jg0Jepw=s96-c
  return (
    <header className='bg-slate-200 shadow-md'> 
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-500'>BUY  </span>
            <span className='text-slate-500'>SELL  </span>
            <span className='text-slate-500'>RENT  </span>
        </h1>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-centre'>
            <input type="text" placeholder='search.'  className='bg-transparent focus:outline-none w-24 sm:w-64' 
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button>
                  <FaSearch className='text-slate-600' />
            </button>
            
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            </Link >
            <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 objectcover'  src={currentUser.avatar} alt="profile" />
            ):(
              <li className=' text-slate-700 hover:underline'>Sign In</li>
            ) }
            </Link>
        </ul>
    </div>
    </header>
  )
}

export default Header