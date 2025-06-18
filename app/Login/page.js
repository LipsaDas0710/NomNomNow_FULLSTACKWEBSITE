'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.urlname) {
      router.push(`/${session.user.urlname}/Home`);
    }
  }, [status, session, router]);
  
  // // Redirect if user is already logged in
  // useEffect(() => {
  //   if (status === 'authenticated' && session?.user?.urlname) {
  //     router.push(`/${session.urlname}/Home`);
  //   }
  // }, [status, session, router]);

  // Function to handle Google Sign-In
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // Let callback handle redirect
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res.ok) {
      // The useEffect will handle the redirect once session is updated
      // Or you can wait a moment for session to update
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-4"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 mb-4"
        >
          Sign in with Google
        </button>
        <div>
          New here? 
          <span 
            onClick={() => router.push('/SignIn')} 
            className='hover:text-blue-500 cursor-pointer ml-1'
          >
            Sign up
          </span>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}