import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useUsuario } from '../../../contexto'
import styles from './LoginWeb.module.css'

export default function LoginWeb() {
  const { login } = useUsuario()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [aba, setAba] = useState('entrar') 
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')

  // para onde vai depois do login (geralmente veio do checkout)
  const destino = state?.redirect ?? '/web'

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
    // simulação dados mockados, então cadastro funciona igual ao login
    const ok = login(email, senha)
    if (ok) {
      navigate(destino, { replace: true })
    } else {
      setErro('Use as credenciais de teste: login@teste.com / abc123')
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>

        {/* logo */}
        <div className={styles.topo}>
          <h1 className={styles.marca}>Raízes do Nordeste</h1>
          <p className={styles.subtitulo}>
            {aba === 'entrar' ? 'Acesse sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {/* abas */}
        <div className={styles.abas}>
          <button
            className={aba === 'entrar' ? `${styles.aba} ${styles.aba_ativa}` : styles.aba}
            onClick={() => { setAba('entrar'); setErro('') }}
          >
            Entrar
          </button>
          <button
            className={aba === 'cadastrar' ? `${styles.aba} ${styles.aba_ativa}` : styles.aba}
            onClick={() => { setAba('cadastrar'); setErro('') }}
          >
            Criar conta
          </button>
        </div>

        {/* formulário */}
        <form
          className={styles.form}
          onSubmit={aba === 'entrar' ? entrar : cadastrar}
        >
          {aba === 'cadastrar' && (
            <div className={styles.campo}>
              <label htmlFor="nome" className={styles.label}>Nome</label>
              <input
                id="nome"
                type="text"
                className={styles.input}
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.campo}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <input
              id="senha"
              type="password"
              className={styles.input}
              placeholder="••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <button type="submit" className={styles.btn_submit}>
            {aba === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        {/* separator */}
        <div className={styles.ou}>
          <span>ou continue com</span>
        </div>

        {/* login só visual, sem integração real */}
        <div className={styles.social}>
          <button className={styles.social_btn} disabled>
            Google
          </button>
          <button className={styles.social_btn} disabled>
            Apple
          </button>
        </div>

        <p className={styles.dica}>
          Dados de teste: <strong>login@teste.com</strong> / <strong>abc123</strong>
        </p>

        <Link to="/web" className={styles.voltar}>
           ← Voltar para a home
        </Link>

      </div>
    </div>
  )
}