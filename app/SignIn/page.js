'use client';
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect,useState } from 'react'
import {useRouter} from 'next/navigation'

export default function Register() {
    const {data:session}=useSession();
    const router = useRouter();
      useEffect(()=>{
          console.log("session:",session);
          if(session?.user)
          {
              router.push("/");
          }
      },[session])


    // Function to handle Google Sign-In (in register page)
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" }); // redirect after login
    };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    urlname:'',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setSuccess('Registration successful!');
      //router.push('/'); // redirect to login page
      await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/",
    });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4 font-bold">Register(Sign in page)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>

       <button type="button" 
          onClick={handleGoogleSignIn}
          className="text-white w-full mt-4 
           bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4
            focus:outline-none focus:ring-[#4285F4]/50 
            font-medium rounded-lg text-sm px-5 py-2.5
             text-center inline-flex items-center 
             justify-between dark:focus:ring-[#4285F4]/55 
             mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" 
             aria-hidden="true" focusable="false" data-prefix="fab" 
             data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 488 512"><path fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 
              0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5
               52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2
                0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                  </path></svg>Sign up with Google<div></div></button>

        <div >Already have an account?<span onClick={()=>router.push('/Login')} className=' hover:text-blue-500'>Login</span></div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
