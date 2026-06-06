import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Profile from './pages/Profile'

// Admin / Recruiter Dashboard
import Companies from './pages/admin/Companies'
import CompanyCreate from './pages/admin/CompanyCreate'
import CompanySetup from './pages/admin/CompanySetup'
import AdminJobs from './pages/admin/AdminJobs'
import PostJob from './pages/admin/PostJob'
import JobSetup from './pages/admin/JobSetup'
import Applicants from './pages/admin/Applicants'

const appRouter = createBrowserRouter([
  // Public/Student routes
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDetails />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  // Recruiter/Admin routes
  {
    path: '/admin/companies',
    element: <Companies />
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path: '/admin/jobs/:id',
    element: <JobSetup />
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants />
  }
])

function App() {
  return (
    <div className="w-full min-h-screen bg-dark-bg text-gray-100 flex flex-col">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
