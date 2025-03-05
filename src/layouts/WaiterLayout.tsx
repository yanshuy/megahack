import WaiterNav from '../components/WaiterNav'
import { Outlet } from 'react-router-dom'

const WaiterLayout = () => {
  return (
    <>
    <header>
        <WaiterNav />
    </header>
    <main>
        <Outlet />
    </main>
    </>
  )
}

export default WaiterLayout