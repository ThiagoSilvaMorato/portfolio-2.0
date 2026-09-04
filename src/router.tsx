import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/root-layout'
import { About } from '@/pages/About'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Projects } from '@/pages/Projects'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'projects', Component: Projects },
      { path: '*', Component: NotFound },
    ],
  },
])
