import { RouterProvider } from 'react-router-dom'
import { NeonCursorField } from '@/components/common/neon-cursor-field'
import { router } from '@/router'

export default function App() {
  return (
    <>
      <NeonCursorField />
      <RouterProvider router={router} />
    </>
  )
}
