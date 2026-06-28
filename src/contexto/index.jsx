import { CarrinhoProvider } from './CarrinhoContexto'
import { UsuarioProvider } from './UsuarioContexto'
import { UnidadeProvider } from './UnidadeContexto'

export { useCarrinho } from './CarrinhoContexto'
export { useUsuario } from './UsuarioContexto'
export { useUnidade } from './UnidadeContexto'

export function Provedores({ children }) {
  return (
    <UnidadeProvider>
      <UsuarioProvider>
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
      </UsuarioProvider>
    </UnidadeProvider>
  )
}

