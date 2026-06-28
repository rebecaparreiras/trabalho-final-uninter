# Trabalho Final de Graduação: Raízes do Nordeste - Trilha Front-end + Codificação

Raízes do Nordeste é uma aplicação front-end multicanal para uma rede fictícia de lanchonetes nordestinas, desenvolvida em React.js como trabalho final da faculdade.

O objetivo do projeto foi simular uma solução real de pedidos digitais, contemplando três canais: mobile/app, web/desktop e totem de autoatendimento. A aplicação permite visualizar cardápio por unidade, montar pedido, simular pagamento externo, acompanhar o status do pedido, acessar promoções, consultar fidelidade e visualizar elementos de LGPD na interface.

<br>

## Deploy

<a href="https://rebecaparreiras.github.io/trabalho-final-uninter/#" target="_blank">Mobile/App</a> <br>
<a href="https://rebecaparreiras.github.io/trabalho-final-uninter/#/web" target="_blank">Web/Desktop</a> <br>
<a href="https://rebecaparreiras.github.io/trabalho-final-uninter/#/totem" target="_blank">Totem</a> <br>

<br>

## Tecnologias utilizadas

<ul>
<li>React.js</li>
<li>Vite</li>
<li>React Router</li>
<li>Context API</li>
<li>CSS Modules</li>
<li>JavaScript</li>
<li>GitHub Pages</li>
</ul>

<br>

## Funcionalidades

<ul>
<li>Seleção de unidade</li>
<li>Cardápio dinâmico por unidade</li>
<li>Produtos disponíveis, indisponíveis e sazonais</li>
<li>Detalhe do produto</li>
<li>Carrinho de compras</li>
<li>Checkout</li>
<li>Simulação de pagamento externo</li>
<li>Pagamento aprovado e recusado</li>
<li>Acompanhamento do status do pedido</li>
<li>Programa de fidelidade</li>
<li>Promoções e campanhas</li>
<li>Popup e avisos de LGPD</li>
<li>Experiências separadas para mobile, web e totem</li>
</ul>

<br>

## Organização do projeto

A aplicação foi construída em um único projeto React, com rotas e layouts próprios para cada canal:

<ul>
<li><b>Mobile/App:</b> rota principal da aplicação;</li>
<li><b>Web/Desktop:</b> rotas iniciadas em <code>/web</code>;</li>
<li><b>Totem:</b> rotas iniciadas em <code>/totem</code>.</li>
</ul>

O projeto utiliza dados mockados para simular unidades, produtos, promoções, usuário, fidelidade, pedidos e textos legais. Não há back-end real, banco de dados ou integração real com pagamento.

<br>

## Decisões técnicas

Usei Context API para gerenciar estados globais como carrinho, unidade selecionada e usuário fictício.

Também optei por CSS Modules para manter os estilos isolados por componente, evitando conflitos entre as versões mobile, web e totem.

O pagamento externo foi representado de forma simulada, com telas de processamento, aprovação e recusa. A LGPD foi aplicada visualmente por meio de popup de consentimento, avisos no checkout e links para políticas legais.

<br>

## Como rodar localmente

```bash
git clone https://github.com/rebecaparreiras/trabalho-final-uninter.git
cd trabalho-final-uninter
npm install
npm run dev
```

<br>

## Build

```bash
npm run build
```

<br>

## Deploy

```bash
npm run deploy
```

<br>

## Considerações finais

Este projeto foi desenvolvido com foco em front-end, responsividade, organização de componentes e simulação de uma experiência multicanal. Mesmo sem back-end, a aplicação representa os principais fluxos de um sistema real de pedidos, desde a escolha da unidade até o acompanhamento do pedido.
