import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState , useEffect } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Spinner } from './components'


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then( (userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(
      setLoading(false)
    )
  },[])

  if (loading) {
    return <Spinner heightVH={'75vh'} />
  }
  
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header for the navigation bar */}
        <header>
          <Navbar />
        </header>

        {/* Main content area where Outlet renders the routes */}
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer linkedinLink={'https://www.linkedin.com/in/atharva-mane/'} githubLink={"https://github.com/atharva026"} />
      </div>
    </>
  )
}

export default App
