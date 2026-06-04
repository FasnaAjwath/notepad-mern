import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='min-h-screen bg-[#153448] flex items-center justify-center'>
      <div className='bg-[#1e4a63] p-10 rounded-2xl w-full max-w-md'>
        <h1 className='text-3xl font-bold text-white text-center mb-6'>Sign In</h1>

        {error && <p className='text-red-400 text-center mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input type='email' name='email' placeholder='Email' onChange={handleChange}
              className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none' />
          </div>
          <div className='mb-6'>
            <input type='password' name='password' placeholder='Password' onChange={handleChange}
              className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none' />
          </div>
          <button type='submit'
            className='w-full bg-[#3C5B6F] text-white py-3 rounded-xl text-lg hover:bg-[#4e7a94] transition'>
            Sign In
          </button>
        </form>

        <p className='text-center text-[#a0b4c0] mt-6'>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className='text-[#7eb8d4] cursor-pointer hover:underline'>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn