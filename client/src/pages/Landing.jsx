import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#153448] flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold text-white mb-4'>📝 Notepad App</h1>
      <p className='text-[#a0b4c0] text-lg mb-10'>Save your thoughts, anytime!</p>

      <div className='flex gap-6'>
        <button
          onClick={() => navigate('/signup')}
          className='bg-[#3C5B6F] text-white px-10 py-3 rounded-xl text-lg hover:bg-[#4e7a94] transition'
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/signin')}
          className='border-2 border-[#3C5B6F] text-white px-10 py-3 rounded-xl text-lg hover:bg-[#3C5B6F] transition'
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Landing