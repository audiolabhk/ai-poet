import React, { useState } from 'react';

function ChatWithOpenAI() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);

  const API_KEY = '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'; // replace with your OpenAI API key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: inputText }],
      temperature: temperature,
      max_tokens: 50,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseText(data.choices[0].message.content);
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2 onClick={()=>setInputText('Write me a haiku about ')}>[Haiku prompt]</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="temperature">Temperature: {temperature.toFixed(2)}</label>
          <input
            type="range"
            id="temperature"
            min="0"
            max="1"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" disabled={!inputText} style={{ marginTop: '0.5rem' }}>
          {isLoading ? 'Loading...' : 'Write!'}
        </button>
      </form>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '1rem' }}>
        {responseText}
      </div>
    </div>
  );
}

export default ChatWithOpenAI;
