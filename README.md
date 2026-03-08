# 🚀 MoodleLoad-Check

Projeto de automação de testes de performance desenvolvido com **k6** e integrado ao ecossistema **Node.js**. O objetivo é validar a estabilidade e o tempo de resposta da plataforma Moodle Demo sob diferentes níveis de carga.

## 📌 Visão Geral do Projeto

Este projeto simula o fluxo real de um usuário dentro da plataforma:

1. **Autenticação**: Realização do login com credenciais de professor.
2. **Navegação**: Acesso à Dashboard e carregamento da listagem de cursos.
3. **Relatório**: Geração automática de resultados em formato visual (HTML).

---

## 📂 Estrutura de Arquivos

* **`loadmoodle.js`**: O "cérebro" do teste. Contém as requisições HTTP e as validações (checks).
* **`package.json`**: Gerenciador do projeto, onde estão configuradas as dependências e o atalho de execução.
* **`loadtest.html`**: Relatório gráfico gerado após cada execução bem-sucedida.

---

## 🛠️ Tecnologias Utilizadas

* **Engine**: `k6`.
* **Ambiente**: Node.js.
* **Relatórios**: `k6-reporter` para visualização de métricas e KPIs.

---

## 🚀 Como Executar o Projeto

Graças à configuração do `package.json`, você não precisa decorar comandos complexos.

### 1. Pré-requisitos

Certifique-se de ter o k6 instalado .

### 2. Rodando o Teste (Atalho NPM)

Abra o terminal na pasta do projeto e use o comando que você criou:

```bash
npm run k6

```

---

## 📊 Configuração de Carga (Stages)

O teste segue uma rampa de usuários virtuais (VUs) para identificar o comportamento do servidor sob pressão:

* **0 a 10s**: Rampa de subida para **1 usuário**.
* **10 a 20s**: Rampa de subida para **3 usuários**.
* **20 a 30s**: Pico de carga com **5 usuários**.
* **30 a 35s**: Rampa de descida para **0 usuários**.

---

## ✅ Validações (Checks)

O script garante a integridade do teste através de verificações automáticas:

* **Logado com sucesso**: Valida se a URL final contém `/my/` ou o texto "Dashboard".
* **Página interna carregou**: Valida se a resposta do servidor para a página de cursos foi `200 OK`.

---

## 📄 Relatório de Saída

Ao finalizar o teste, o arquivo **`loadtest.html`** será atualizado. Nele, você encontrará:

* Métricas de **P(95)** (Tempo de resposta de 95% dos usuários).
* Taxa de sucesso das requisições.
* Gráficos de vazão e latência.
