import { createBrowserRouter, Outlet } from 'react-router-dom'
import BottomNav from '../componentes/layout/BottomNav'
import HeaderWeb from '../componentes/layout/HeaderWeb'
import NavWeb from '../componentes/layout/NavWeb'
import FooterWeb from '../componentes/layout/FooterWeb'
import PopupLGPD from '../componentes/lgpd/PopupLGPD'

// páginas totem
import HomeTotem from '../paginas/totem/HomeTotem'
import CardapioCheckoutTotem from '../paginas/totem/CardapioCheckoutTotem'
import PagamentoTotem from '../paginas/totem/PagamentoTotem'
import PagamentoAprovadoTotem from '../paginas/totem/PagamentoAprovadoTotem'
import PagamentoRecusadoTotem from '../paginas/totem/PagamentoRecusadoTotem'

// páginas web
import HomeWeb from '../paginas/web/HomeWeb'
import CardapioCheckoutWeb from '../paginas/web/CardapioCheckoutWeb'
import LoginWeb from '../paginas/web/LoginWeb'
import PagamentoWeb from '../paginas/web/PagamentoWeb'
import PagamentoAprovadoWeb from '../paginas/web/PagamentoAprovadoWeb'
import PagamentoRecusadoWeb from '../paginas/web/PagamentoRecusadoWeb'
import FidelidadeWeb from '../paginas/web/FidelidadeWeb'
import StatusPedidoWeb from '../paginas/web/StatusPedidoWeb'
import NossasLojasWeb from '../paginas/web/NossasLojasWeb'
import PoliticasLegaisWeb from '../paginas/web/PoliticasLegaisWeb'

// páginas mobile
import Home from '../paginas/mobile/Home'
import SelecionarUnidade from '../paginas/mobile/SelecionarUnidade'
import Cardapio from '../paginas/mobile/Cardapio'
import DetalhesProduto from '../paginas/mobile/DetalhesProduto'
import Carrinho from '../paginas/mobile/Carrinho'
import Login from '../paginas/mobile/Login'
import Privacidade from '../paginas/mobile/Privacidade'
import PoliticasLegais from '../paginas/mobile/PoliticasLegais'
import Checkout from '../paginas/mobile/Checkout'
import Pagamento from '../paginas/mobile/Pagamento'
import PagamentoAprovado from '../paginas/mobile/PagamentoAprovado'
import PagamentoRecusado from '../paginas/mobile/PagamentoRecusado'
import AcompanharPedido from '../paginas/mobile/AcompanharPedido'
import Fidelidade from '../paginas/mobile/Fidelidade'

// layout mobile
function LayoutMobile() {
  return (
    <div style={{
      maxWidth: '430px',
      margin: '0 auto',
      minHeight: '100dvh',
      paddingBottom: 'var(--altura-bottom-nav)',
      backgroundColor: 'var(--cor-fundo)',
      position: 'relative',
    }}>
      <Outlet />
      <BottomNav />
      <PopupLGPD rotaPrivacidade="/privacidade" />
    </div>
  )
}

// layout web
function LayoutWeb() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderWeb />
      <NavWeb />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <FooterWeb />
      <PopupLGPD rotaPrivacidade="/web/privacidade" />
    </div>
  )
}

// layout totem
function LayoutTotem() {
  return (
    <div style={{
      maxWidth: '768px',
      margin: '0 auto',
      minHeight: '100dvh',
      backgroundColor: 'var(--cor-fundo)',
    }}>
      <Outlet />
    </div>
  )
}

const rotas = createBrowserRouter([
  // canal mobile
  {
    element: <LayoutMobile />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/unidades', element: <SelecionarUnidade /> },
      { path: '/cardapio', element: <Cardapio /> },
      { path: '/cardapio/:id', element: <DetalhesProduto /> },
      { path: '/carrinho', element: <Carrinho /> },
      { path: '/login', element: <Login /> },
      { path: '/privacidade', element: <Privacidade /> },
      { path: '/politicas', element: <PoliticasLegais /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/pagamento', element: <Pagamento /> },
      { path: '/pagamento/aprovado', element: <PagamentoAprovado /> },
      { path: '/pagamento/recusado', element: <PagamentoRecusado /> },
      { path: '/pedido', element: <AcompanharPedido /> },
      { path: '/fidelidade',element: <Fidelidade /> },
    ],
  },

  // canal web
  {
    path: '/web',
    element: <LayoutWeb />,
    children: [
      { index: true, element: <HomeWeb /> },
      { path: 'cardapio', element: <CardapioCheckoutWeb /> },
      { path: 'cardapio/:id', element: <DetalhesProduto /> },
      { path: 'login', element: <LoginWeb /> },
      { path: 'pagamento', element: <PagamentoWeb /> },
      { path: 'pagamento/aprovado', element: <PagamentoAprovadoWeb /> },
      { path: 'pagamento/recusado', element: <PagamentoRecusadoWeb /> },
      { path: 'fidelidade', element: <FidelidadeWeb /> },
      { path: 'pedido', element: <StatusPedidoWeb /> },
      { path: 'unidades', element: <NossasLojasWeb /> },
      { path: 'privacidade', element: <PoliticasLegaisWeb /> },
    ],
  },

  // canal totem
  {
    path: '/totem',
    element: <LayoutTotem />,
    children: [
      { index: true, element: <HomeTotem /> },
      { path: 'cardapio', element: <CardapioCheckoutTotem /> },
      { path: 'cardapio/:id', element: <DetalhesProduto /> },
      { path: 'pagamento', element: <PagamentoTotem /> },
      { path: 'pagamento/aprovado', element: <PagamentoAprovadoTotem /> },
      { path: 'pagamento/recusado', element: <PagamentoRecusadoTotem /> },
      { path: 'fidelidade', element: <Fidelidade /> },
    ],
  },
])

export default rotas

