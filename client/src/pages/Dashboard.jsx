import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const token = localStorage.getItem('token')

  const getNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { authorization: token }
      })
      setNotes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addNote = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/notes', { title, content }, {
        headers: { authorization: token }
      })
      setTitle('')
      setContent('')
      getNotes()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { authorization: token }
      })
      getNotes()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (note) => {
    setEditId(note._id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const updateNote = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/api/notes/${editId}`,
      { title: editTitle, content: editContent }, {
        headers: { authorization: token }
      })
      setEditId(null)
      setEditTitle('')
      setEditContent('')
      getNotes()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className='min-h-screen bg-[#153448] py-10 px-4'>
      <div className='max-w-2xl mx-auto'>

        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>📝 My Notes</h1>
          <button onClick={handleLogout}
            className='bg-[#3C5B6F] text-white px-5 py-2 rounded-xl hover:bg-[#4e7a94] transition'>
            Logout
          </button>
        </div>

        {/* Add Note Form */}
        <div className='bg-[#1e4a63] p-6 rounded-2xl mb-8'>
          <h2 className='text-white text-xl font-semibold mb-4'>Add New Note</h2>
          <form onSubmit={addNote}>
            <div className='mb-3'>
              <input type='text' placeholder='Title' value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none' />
            </div>
            <div className='mb-4'>
              <textarea placeholder='Content' value={content}
                onChange={(e) => setContent(e.target.value)}
                className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none resize-none h-24' />
            </div>
            <button type='submit'
              className='bg-[#3C5B6F] text-white px-8 py-2 rounded-xl hover:bg-[#4e7a94] transition'>
              Add Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className='text-center text-[#a0b4c0]'>No notes yet. Add your first note!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className='bg-[#1e4a63] p-6 rounded-2xl mb-4'>
              {editId === note._id ? (
                <form onSubmit={updateNote}>
                  <div className='mb-3'>
                    <input type='text' value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none' />
                  </div>
                  <div className='mb-4'>
                    <textarea value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className='w-full bg-[#3C5B6F] text-white placeholder-[#a0b4c0] px-4 py-3 rounded-xl outline-none resize-none h-20' />
                  </div>
                  <div className='flex gap-3'>
                    <button type='submit'
                      className='bg-[#3C5B6F] text-white px-6 py-2 rounded-xl hover:bg-[#4e7a94] transition'>
                      Save
                    </button>
                    <button type='button' onClick={() => setEditId(null)}
                      className='bg-[#153448] text-white px-6 py-2 rounded-xl hover:bg-[#1e4a63] transition'>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className='text-white text-xl font-semibold mb-2'>{note.title}</h3>
                  <p className='text-[#a0b4c0] mb-4'>{note.content}</p>
                  <div className='flex gap-3'>
                    <button onClick={() => handleEdit(note)}
                      className='bg-[#3C5B6F] text-white px-6 py-2 rounded-xl hover:bg-[#4e7a94] transition'>
                      Edit
                    </button>
                    <button onClick={() => deleteNote(note._id)}
                      className='bg-[#6b2737] text-white px-6 py-2 rounded-xl hover:bg-[#8b3347] transition'>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard