# Devagram — Web (React)

Interface web de uma rede social de fotos, no estilo Instagram: cadastro e login, feed de quem você segue, busca de usuários, perfil, curtidas, comentários e publicação de fotos.

Feita com Next.js e React, consome a [API do Devagram](https://github.com/PauloScotti/devagram-nextjs). Nasceu como projeto da formação Devaria e foi atualizada para as versões atuais do Next e do React.

## Stack

| Camada    | Tecnologia                        |
| --------- | --------------------------------- |
| Framework | Next.js 16 (Pages Router), React 19 |
| Estilos   | Sass                              |
| HTTP      | axios                             |
| Testes    | Vitest                            |

## Como rodar

```bash
npm install
cp .env.example .env.local   # aponte NEXT_PUBLIC_API_URL para a API
npm run dev
```

A aplicação sobe em `http://localhost:3000`. É preciso ter a API rodando; `NEXT_PUBLIC_API_URL` é o endereço dela, sem `/api` no fim.

## Telas

| Rota             | O que é                                         |
| ---------------- | ----------------------------------------------- |
| `/`              | Login ou, com sessão ativa, o feed              |
| `/cadastro`      | Criar conta, com foto opcional                  |
| `/perfil/[id]`   | Perfil de um usuário (`/perfil/eu` é o próprio) |
| `/perfil/editar` | Editar nome e foto                              |
| `/publicacao`    | Publicar uma foto                               |

## Estrutura

```
componentes/  componentes de interface
hoc/          proteção das telas que exigem login
pages/        rotas
services/     chamadas à API
styles/       estilos globais e variáveis
utils/        validadores de formulário e sessão
tests/        testes unitários
```

## Testes

```bash
npm test
```

## Sessão

O token fica no `localStorage` e vai no cabeçalho `Authorization` de cada requisição. Quando a API responde 401 (token expirado ou inválido), a sessão é encerrada e o usuário volta para o login.
