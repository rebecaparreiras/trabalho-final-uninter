import { createContext, useContext, useState } from 'react'

const UnidadeContexto = createContext(null)

export function UnidadeProvider({ children }) {
  const [unidade, setUnidade] = useState(() => {
    try {
      const salva = localStorage.getItem('raizes:unidade')
      return salva ? JSON.parse(salva) : null
    } catch {
      return null
    }
  })

  function selecionarUnidade(novaUnidade) {
    setUnidade(novaUnidade)
    localStorage.setItem('raizes:unidade', JSON.stringify(novaUnidade))
  }

  function limparUnidade() {
    setUnidade(null)
    localStorage.removeItem('raizes:unidade')
  }

  return (
    <UnidadeContexto.Provider value={{ unidade, selecionarUnidade, limparUnidade }}>
      {children}
    </UnidadeContexto.Provider>
  )
}

export function useUnidade() {
  const ctx = useContext(UnidadeContexto)
  if (!ctx) throw new Error('useUnidade deve estar dentro de UnidadeProvider')
  return ctx
}