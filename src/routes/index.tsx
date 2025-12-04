  import { createFileRoute } from '@tanstack/react-router'
  import Login from "./login";
  import LayoutBlack from '@/Components/LayoutBlack';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <LayoutBlack>
    <Login />
    </LayoutBlack>
  )
}
