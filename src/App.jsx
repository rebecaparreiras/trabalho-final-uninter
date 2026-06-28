import { RouterProvider } from 'react-router-dom'
import rotas from './rotas'
import { Provedores } from './contexto'
import './estilos/global.css'

export default function App() {
  return (
    <Provedores>
      <RouterProvider router={rotas} />
    </Provedores>
  )
}
