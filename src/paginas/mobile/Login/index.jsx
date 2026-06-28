import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Entrada from '../../../componentes/comuns/Entrada'
import Botao from '../../../componentes/comuns/Botao'
import { useUsuario } from '../../../contexto'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useUsuario()
  const navigate = useNavigate()
  const { state } = useLocation()

  // pra onde vai depois de logar (veio do carrinho? vai pro privacidade)
  const destino = state?.redirect ?? '/'

  const [aba, setAba] = useState('entrar') // entrar ou cadastrar
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')

  function entrar(e) {
    e.preventDefault()
    setErro('')
    const ok = login(email, senha)
    if (ok) {
      navigate(destino, { replace: true })
    } else {
      setErro('E-mail ou senha incorretos. Use: login@teste.com / abc123')
    }
  }

  function cadastrar(e) {
    e.preventDefault()
    setErro('')
    // no mock o cadastro também usa as credenciais de teste
    const ok = login(email, senha)
    if (ok) {
      navigate(destino, { replace: true })
    } else {
      setErro('Para testar, use: login@teste.com / abc123')
    }
  }

  function trocarAba(novaAba) {
    setAba(novaAba)
    setErro('')
  }

  return (
    <>
      <HeaderMobile titulo="Minha conta" mostrarVoltar={true} mostrarNotificacao={false} />
      <main className={styles.main}>

        {/* abas entrar/cadastrar */}
        <div className={styles.abas}>
          <button
            className={aba === 'entrar' ? `${styles.aba} ${styles.aba_ativa}` : styles.aba}
            onClick={() => trocarAba('entrar')}
          >
            Entrar
          </button>
          <button
            className={aba === 'cadastrar' ? `${styles.aba} ${styles.aba_ativa}` : styles.aba}
            onClick={() => trocarAba('cadastrar')}
          >
            Cadastrar
          </button>
        </div>

        {aba === 'entrar' && (
          <form onSubmit={entrar} className={styles.form}>
            <Entrada
              id="email"
              label="E-mail"
              tipo="email"
              valor={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              obrigatorio
            />
            <div className={styles.senha_wrapper}>
              <Entrada
                id="senha"
                label="Senha"
                tipo={mostrarSenha ? 'text' : 'password'}
                valor={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••"
                obrigatorio
              />
              <button
                type="button"
                className={styles.toggle_senha}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <Botao variante="primario" tamanho="grande" largura="cheio" tipo="submit">
              Entrar
            </Botao>

            <p className={styles.link_esqueci}>
              <Link to="/privacidade">Esqueci minha senha</Link>
            </p>

            <div className={styles.divisor}><span>ou continue com</span></div>

            {/* botões sociais desabilitados - só visual */}
            <div className={styles.sociais}>
              <button type="button" className={styles.social_btn} disabled>Google</button>
              <button type="button" className={styles.social_btn} disabled>Apple</button>
            </div>
          </form>
        )}

        {aba === 'cadastrar' && (
          <form onSubmit={cadastrar} className={styles.form}>
            <Entrada
              id="nome"
              label="Nome completo"
              tipo="text"
              valor={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              obrigatorio
            />
            <Entrada
              id="email-cad"
              label="E-mail"
              tipo="email"
              valor={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              obrigatorio
            />
            <div className={styles.senha_wrapper}>
              <Entrada
                id="senha-cad"
                label="Senha"
                tipo={mostrarSenha ? 'text' : 'password'}
                valor={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                obrigatorio
              />
              <button
                type="button"
                className={styles.toggle_senha}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <Botao variante="primario" tamanho="grande" largura="cheio" tipo="submit">
               Criar conta
            </Botao>
          </form>
        )}

        <p className={styles.termos}>
          Ao continuar você aceita os{' '}
          <Link to="/privacidade">Termos de Uso</Link> e a{' '}
          <Link to="/privacidade">Política de Privacidade</Link>.
        </p>

      </main>
    </>
  )
}