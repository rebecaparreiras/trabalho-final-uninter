import { createContext, useContext, useState } from 'react'
import { usuarioTeste, usuarioVisitante } from '../dados/usuario'

const UsuarioContexto = createContext(null)

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(usuarioVisitante)

  function login(email, senha) {
    if (email === usuarioTeste.email && senha === usuarioTeste.senha) {
      setUsuario(usuarioTeste)
      return true
    }
    return false
  }

  function logout() {
    setUsuario(usuarioVisitante)
  }

  const logado = usuario.id !== null

  return (
    <UsuarioContexto.Provider value={{ usuario, login, logout, logado }}>
      {children}
    </UsuarioContexto.Provider>
  )
}

export function useUsuario() {
  const ctx = useContext(UsuarioContexto)
  if (!ctx) throw new Error('useUsuario deve estar dentro de UsuarioProvider')
  return ctx
}