import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Error, Home } from './routes'
import { Card } from './routes/Card.route.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/card/:name/:id?',
        element: <Card />
      },
    ]
  }
])

const root = createRoot(document.getElementById('root')!)

root.render( <RouterProvider router={router} /> )
