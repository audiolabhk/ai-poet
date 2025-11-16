import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { InferenceClient } from "@huggingface/inference";

export default function Huggingpoet() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const accessToken = import.meta.VITE_HF_API_KEY

  const hf = new InferenceClient(accessToken);
  const client = new InferenceClient(accessToken);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setOutputText('Generating...');

    try {
      await hf.textGeneration({
        method: 'POST',
        mode: 'cors',
        model: 'mistralai/Mixtral-8x7B-v0.1',
        provider: "together",
        inputs: inputText
      })
    } catch (error) {
      setOutputText(`Error: ${error.message}`);
    }
  }
  return (
    <div style={{ margin: '0 auto', padding: '1rem' }}>
      <Navbar />
      <h1>Huggingpoet Text Generation</h1>
      <form onSubmit={handleGenerate}>
        <div>
          <label>
            Input Text:
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ width: '80%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Generate
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <h2>Output:</h2>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem' }}>{outputText}</pre>
      </div>
    </div>
  );
} 