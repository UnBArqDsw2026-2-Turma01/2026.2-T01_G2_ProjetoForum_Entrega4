# G2_ProjetoForum | Entrega 04 — Arquitetura e Reutilização de Software

Repositório do Grupo 02 da disciplina **FGA0208 — Arquitetura e Desenho de Software** (UnB/FCTE), destinado aos artefatos da Quarta Entrega do projeto **G2_ProjetoForum**.

## Sobre a Entrega

Esta entrega segue o foco **Documento de Arquitetura (DAS)**, adotando o template RUP (Modelo de Visões 4+1) com aprofundamento na **Visão Lógica** e na **Visão de Implementação**. Como comprovação prática do estilo arquitetural **N-Camadas** (`Apresentação`, `Negócio` e `Persistência`), foi implementado em Node.js nativo o módulo de criação e listagem de publicações.

## Informações do Projeto

- **Instituição:** Universidade de Brasília (UnB — FCTE)
- **Disciplina:** FGA0208 — Arquitetura e Desenho de Software
- **Turma:** T01 — 2026.2
- **Grupo:** 02 (`G2_ProjetoForum`)
- **Entrega:** 04 — Arquitetura e Reutilização de Software (DAS)

## Participante

| Matrícula | Aluno | GitHub |
| :--- | :--- | :--- |
| 23/1012227 | Guilherme Moura da Silva Neto | [@Guilherme-Moura](https://github.com/Guilherme-Moura) |

## Documentação (GitHub Pages)

**[Acessar a documentação completa no GitHub Pages](https://unbarqdsw2026-2-turma01.github.io/2026.2-T01_G2_ProjetoForum_Entrega4/)**

## Tecnologia

A geração do site estático é realizada utilizando o [docsify](https://docsify.js.org/).

```shell
"Docsify generates your documentation website on the fly. Unlike GitBook, it does not generate static html files. Instead, it smartly loads and parses your Markdown files and displays them as a website. To start using it, all you need to do is create an index.html and deploy it on GitHub Pages."
```

### Instalando o docsify

Execute o comando:

```shell
npm i docsify-cli -g
```

### Executando localmente

Para iniciar o site localmente, utilize o comando:

```shell
docsify serve ./docs
```
