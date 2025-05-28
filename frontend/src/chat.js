import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    const salvas = localStorage.getItem('conversas');
    return salvas
      ? JSON.parse(salvas)
      : [
          { from: 'bot', text: 'Olá! Eu sou o Rafael, seu parceiro aqui na Taurus 🏢.' },
          { from: 'bot', text: 'Fui criado pra te ajudar com dúvidas, planilhas, tecnologia ou o que mais estiver travando o seu dia 💡.' },
          { from: 'bot', text: 'Pode falar sem medo, viu? Me conta: qual desafio você tá enfrentando agora? 😊' },
        ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('conversas', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.body.style.backgroundColor = 'darkslategrey';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.reply || 'Sem resposta.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Erro ao conectar com o servidor.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const limparConversa = () => {
    const confirm = window.confirm('Tem certeza que deseja apagar toda a conversa?');
    if (!confirm) return;

    const mensagensIniciais = [
      { from: 'bot', text: 'Olá! Eu sou o Rafael, seu parceiro aqui na Taurus 🏢.' },
      { from: 'bot', text: 'Fui criado pra te ajudar com dúvidas, planilhas, tecnologia ou o que mais estiver travando o seu dia 💡.' },
      { from: 'bot', text: 'Pode falar sem medo, viu? Me conta: qual desafio você tá enfrentando agora? 😊' },
    ];
    setMessages(mensagensIniciais);
    localStorage.removeItem('conversas');
  };

  const copiarConversa = () => {
    const texto = messages.map((m) => `${m.from === 'user' ? 'Você' : 'Rafael'}: ${m.text}`).join('\n');
    navigator.clipboard.writeText(texto);
    alert('Conversa copiada para a área de transferência!');
  };

  const exportarTXT = () => {
    const texto = messages.map((m) => `${m.from === 'user' ? 'Você' : 'Rafael'}: ${m.text}`).join('\n');
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversa_taurus.txt';
    link.click();
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#e0e0e0',
        borderRadius: 8,
        padding: 20,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: 20 }}>Taurus Chatbot</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 10, justifyContent: 'center' }}>
        <button onClick={limparConversa} style={botaoEstilo}>🗑️ Limpar</button>
        <button onClick={copiarConversa} style={botaoEstilo}>📋 Copiar</button>
        <button onClick={exportarTXT} style={botaoEstilo}>⬇️ Exportar</button>
      </div>

      <div
        ref={chatRef}
        style={{
          border: '1px solid #333',
          padding: 10,
          height: 400,
          overflowY: 'auto',
          backgroundColor: '#181818',
          borderRadius: 8,
          marginBottom: 10,
          flexGrow: 1,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === 'user' ? 'right' : 'left',
              margin: '10px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '10px 15px',
                borderRadius: 20,
                backgroundColor: msg.from === 'user' ? '#3a7bd5' : '#2c2c2c',
                color: msg.from === 'user' ? 'white' : '#a0a0a0',
                maxWidth: '80%',
                wordWrap: 'break-word',
                boxShadow: msg.from === 'user' ? '0 0 8px #3a7bd5' : 'none',
                fontSize: 15,
              }}
            >
              {msg.from === 'bot' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', margin: '10px 0', fontStyle: 'italic', color: '#85C1E9' }}>
            Rafael está digitando...
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 5,
          border: '1px solid #4a90e2',
          backgroundColor: '#1e1e1e',
          color: 'white',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: 12,
          padding: '12px 0',
          fontSize: 16,
          borderRadius: 5,
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          cursor: loading ? 'default' : 'pointer',
          fontWeight: 'bold',
          boxShadow: loading ? 'none' : '0 0 10px #4a90e2',
          transition: 'background-color 0.3s',
        }}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
}

const botaoEstilo = {
  backgroundColor: '#1f1f1f',
  color: '#4a90e2',
  border: '1px solid #4a90e2',
  borderRadius: 5,
  padding: '8px 15px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
