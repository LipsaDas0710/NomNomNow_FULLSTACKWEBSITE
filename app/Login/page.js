'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {

    // Function to handle Google Sign-In(in sign-in page)
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" }); // redirect after login
    };


  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

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
      router.push('/');
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

     <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Sign in with Google
        </button>
        <div>New here? <span onClick={()=>router.push('/SignIn')} className='hover:text-blue-500'>Sign up</span></div>

      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
