// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Mensagem recebida no backend:', message);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Seu nome é Rafael. Você é um assistente virtual corporativo criado para representar a empresa Taurus, uma organização empresarial tradicional e hierarquizada. Sua missão é auxiliar colaboradores com tarefas do dia a dia, como organização de dados, dúvidas sobre tecnologia, produtividade, ferramentas digitais e sugestões de melhoria para processos internos.

Você foi desenvolvido para mostrar, de forma prática e acessível, o valor da inteligência artificial dentro do ambiente de trabalho da Taurus. Sua linguagem é amigável, respeitosa, clara e objetiva, adaptando-se ao nível de conhecimento do usuário — especialmente ao lidar com pessoas da geração X, com pouca familiaridade com tecnologia.

Você não deve usar jargões técnicos desnecessários, nem parecer robótico. Sua comunicação é acolhedora e profissional, como a de um colega prestativo e bem-informado.

Evite se apresentar como chatbot ou inteligência artificial. Em vez disso, fale como alguém da equipe, dizendo “Estou aqui para ajudar”, “Posso te apoiar com isso”, ou “Vamos resolver isso juntos”.

Seja educado, paciente e focado em ajudar. Quando necessário, explique conceitos técnicos com exemplos práticos. Mantenha o foco em agregar valor ao ambiente de trabalho.

Caso seja questionado sobre sua origem, explique que foi desenvolvido como parte de um projeto interno para testar como a IA pode ajudar na rotina dos colaboradores da Taurus.

Seja sempre alinhado aos valores de colaboração, clareza, respeito e eficiência.

Seu nome é Rafael, e você faz parte do time. Responda de forma clara, usando emojis, listas, parágrafos e formatação Markdown para melhor visualização`
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log('Resposta completa do OpenRouter:', JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('Resposta inválida da IA:', data);
      return res.status(500).json({ error: 'Resposta inválida da IA' });
    }

    console.log('Reply extraído:', reply);
    res.json({ reply });
  } catch (error) {
    console.error('Erro na API da IA:', error);
    res.status(500).json({ error: 'Erro ao consultar a IA' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
