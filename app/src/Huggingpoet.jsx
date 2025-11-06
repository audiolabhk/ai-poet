import React, { useState } from 'react';
import Navbar from './components/Navbar';

function Huggingpoet() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(128);

  const HF_API_TOKEN = import.meta.env.VITE_HF_API_KEY;
  const model = 'moonshotai/Kimi-K2-Instruct-0905';  // Using GPT-2 as it's a reliable poetry model

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseText('');

    // testing
    console.log(HF_API_TOKEN)

    const apiUrl = `https://router.huggingface.co/v1/${model}`;
    const requestBody = {
      inputs: `Write a poem about: ${inputText}`,
      parameters: {
        temperature: temperature,
        max_new_tokens: maxTokens,
        return_full_text: false,
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data && data.length > 0 && data[0].generated_text) {
        setResponseText(data[0].generated_text);
      } else {
        setResponseText('No response generated.');
      }
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
      <Navbar />
      <h2>Hugging Face | {model}</h2>
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
        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="maxTokens">Max Tokens: {maxTokens}</label>
          <input
            type="range"
            id="maxTokens"
            min="32"
            max="256"
            step="1"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '1rem' }}>
        {responseText}
      </div>
    </div>
  );
}

export default Huggingpoet;