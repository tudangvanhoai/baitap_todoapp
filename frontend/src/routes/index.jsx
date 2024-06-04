import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Task } from '@/pages'

const router = createBrowserRouter([{ path: '/', element: <Task /> }])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
