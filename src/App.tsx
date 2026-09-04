import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { NeonCursorField } from '@/components/common/neon-cursor-field'
import { router } from '@/router'

export default function App() {
  return (
    <HelmetProvider>
      <NeonCursorField />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
