import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Botao from '../../../componentes/comuns/Botao'
import styles from './Privacidade.module.css'

export default function Privacidade() {
  const navigate = useNavigate()

  // os dois primeiros são obrigatórios pra continuar
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [aceitaProcessamento, setAceitaProcessamento] = useState(false)
  const [aceitaMarketing, setAceitaMarketing] = useState(false)

  const podeContinar = aceitaTermos && aceitaProcessamento

  return (
    <>
      <HeaderMobile titulo="Privacidade" mostrarVoltar={true} mostrarNotificacao={false} />
      <main className={styles.main}>

        <div className={styles.cabecalho}>
          <div className={styles.icone_wrapper} aria-hidden="true">
            <Shield size={32} />
          </div>
          <h1 className={styles.titulo}>Seus dados são importantes para nós</h1>
          <p className={styles.descricao}>
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018),
            precisamos da sua autorização antes de prosseguir.
          </p>
        </div>

        <section>
          <h2 className={styles.secao_titulo}>AUTORIZAÇÕES</h2>
          <div className={styles.opcoes}>

            <label className={styles.opcao}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={aceitaTermos}
                onChange={(e) => setAceitaTermos(e.target.checked)}
              />
              <div>
                <strong>Política de Privacidade e Termos de Uso</strong>
                <p>Li e aceito a Política de Privacidade e os Termos de Uso do Raízes do Nordeste.</p>
              </div>
              <span className={styles.tag_obrigatorio}>Obrigatório</span>
            </label>

            <label className={styles.opcao}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={aceitaProcessamento}
                onChange={(e) => setAceitaProcessamento(e.target.checked)}
              />
              <div>
                <strong>Processamento do pedido</strong>
                <p>Permito o uso dos meus dados para processamento e entrega do pedido.</p>
              </div>
              <span className={styles.tag_obrigatorio}>Obrigatório</span>
            </label>

            <label className={styles.opcao}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={aceitaMarketing}
                onChange={(e) => setAceitaMarketing(e.target.checked)}
              />
              <div>
                <strong>Promoções e novidades</strong>
                <p>Quero receber promoções, novidades e ofertas especiais por e-mail.</p>
              </div>
              <span className={styles.tag_opcional}>Opcional</span>
            </label>

          </div>
        </section>

        {!podeContinar && (
          <p className={styles.aviso}>
             Você precisa aceitar os itens obrigatórios para continuar.
          </p>
        )}

        <Botao
          variante="primario"
          tamanho="grande"
          largura="cheio"
          disabled={!podeContinar}
          onClick={() => navigate('/checkout')}
        >
          Continuar para o pedido
        </Botao>

        <p className={styles.info_lgpd}>
          Seus dados são armazendos com segurança e utilizados apenas conforme as
          finalidades descritas acima. Para exercer seus direitos como titular,
          entre em contato conosco.
        </p>

      </main>
    </>
  )
}