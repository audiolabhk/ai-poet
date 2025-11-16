import React, { useState } from 'react';
import Navbar from './components/Navbar';

function Huggingface() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [type, setType] = useState('haiku');

  const apiKey = import.meta.env.VITE_HF_API_KEY;

  const handleClear = () => {
    setInputText('');
    setResponseText('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = 'https://router.huggingface.co/hf-inference/models/openai-community/gpt2';

    const prompt = `Write a ${type} about ${inputText}:\n\n`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            temperature: temperature,
            max_new_tokens: 200,
            return_full_text: false,
            num_return_sequences: 1,
            do_sample: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseText(data[0].generated_text.replace(prompt, ''));
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <Navbar />
      <h2>Hugging Face</h2>
      <select onChange={(e) => setType(e.target.value)} style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem', fontSize: '1rem' }}>
        <option value="haiku">Haiku</option>
        <option value="sonnet">Sonnet</option>
        <option value="poem">Poem</option>
      </select>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Subject for your ${type}...`}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="temperature">Creativity: {temperature.toFixed(2)}</label>
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
          {isLoading ? 'Working on it...' : 'Write!'}
        </button>
      </form>
      <button onClick={handleClear}>Clear</button>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', color: "black", padding: '1rem' }}>
        {responseText}
      </div>
    </div>
  );
}

export default Huggingface;
