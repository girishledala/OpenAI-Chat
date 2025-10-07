'use client';

import { useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import PersonaSelector from '@/components/PersonaSelector';
import { buildSystemPrompt } from '@/lib/promptUtils';

export default function ChatPage() {
  const [persona, setPersona] = useState('code-reviewer');
  const [messages, setMessages] = useState([
    { role: 'system', content: buildSystemPrompt(persona) }
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const assistantMessage = await res.text();

      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setMessages([...newMessages, { role: 'assistant', content: 'Error: failed to get response' }]);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PersonaSelector onChange={setPersona} />

      <div className="space-y-2 mt-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} content={m.content} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
