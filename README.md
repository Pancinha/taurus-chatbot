# 🧠 Taurus Chatbot

Este projeto é um protótipo funcional de chatbot com integração de Inteligência Artificial via **OpenRouter**, desenvolvido como parte do desafio FullStack da empresa fictícia Taurus.

O objetivo é demonstrar como a IA pode auxiliar nas rotinas de uma empresa corporativa, entregando uma interface moderna, responsiva e fácil de usar.

---

## 📋 Proposta

- Interface web responsiva construída com React e Vite  
- Backend em Node.js com Express para intermediar a comunicação com a API OpenRouter  
- Integração com a API OpenRouter para gerar respostas naturais e contextualizadas  
- Visual corporativo simples e alinhado com a identidade da empresa fictícia *Taurus*  
- Armazenamento local (em breve) para registrar conversas

---

## 🧪 Tecnologias Utilizadas

### Frontend
- React  
- Vite  
- CSS

### Backend
- Node.js  
- Express  
- Dotenv

### IA
- OpenRouter API (modelo GPT-based)

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado  
- Conta no [OpenRouter](https://openrouter.ai) para obter a API Key gratuita

### Passos para executar

1. Clone o repositório:

```bash
git clone https://github.com/Pancinha/taurus-chatbot.git
cd taurus-chatbot

2. Instale as dependências do backend e frontend:
cd backend
npm install
cd ../frontend
npm install

3. Configure sua chave da API OpenRouter:
Acesse https://openrouter.ai e crie sua conta.
Gere sua chave de API.
Crie um arquivo .env na pasta backend com o seguinte conteúdo: OPENROUTER_API_KEY=sua-chave-aqui

4. Inicie os servidores:
cd backend
npm run dev
cd frontend
npm run dev

5. Acesse a aplicação no navegador:

