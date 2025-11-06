  <h1>AI Poet (Haikus, Sonnets, ..., Poems)</h1>
  <p>
    An interactive React web app that generates poetry in different styles (Haiku, Sonnet, Poem) using OpenAI's GPT-4 and HuggingFace's APIs. Users input a subject, select the poetry type, set temperature for creativity, and receive AI-generated poetic content.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Select poetry style: Haiku, Sonnet, or Poem</li>
    <li>Input any subject or theme for the poem</li>
    <li>Adjust temperature (0 to 1) to control creativity and randomness of AI responses</li>
    <li>Dynamic output display with loading state feedback</li>
    <li>Simple and clean UI for ease of use</li>
  </ul>

  <h2>Getting Started</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js and npm installed</li>
    <li>React environment (create-react-app or similar)</li>
    <li>OpenAI API key with appropriate permissions</li>
  </ul>

  <h3>Installation</h3>
  <p>1. Clone the repository:</p>
  <pre><code>git clone https://github.com/yourusername/ai-poetry-writer.git
cd ai-poetry-writer
  </code></pre>
  <p>2. Install dependencies:</p>
  <pre><code>npm install</code></pre>
  <p>3. Add your OpenAI API key:</p>
  <p>Replace the placeholder in <code>ChatWithOpenAI.js</code> file:</p>
  <pre><code>const API_KEY = 'your_openai_api_key_here';</code></pre>

  <h3>Usage</h3>
  <pre><code>npm start</code></pre>
  <p>Open your browser at <code>http://localhost:3000</code> and interact with the app by choosing a poetry type, entering a subject, adjusting creativity, and generating poetry.</p>

  <h2>Code Overview</h2>
  <ul>
    <li><code>ChatWithOpenAI</code> React component uses hooks (<code>useState</code>) for state management.</li>
    <li>Sends a POST request to OpenAI's Chat Completions (GPT-4) endpoint.</li>
    <li>Displays AI-generated poetic response.</li>
    <li>Select dropdown controls poetry type with state synchronization.</li>
    <li>Temperature slider adjusts the randomness of generated content.</li>
  </ul>

  <h2>Known Issues</h2>
  <ul>
    <li>Ensure your OpenAI API key is valid and has usage quota.</li>
    <li>Network errors will display error messages in the response panel.</li>
    <li>Currently supports only three poetry types; extensible to more.</li>
  </ul>

  <h2>Contributing</h2>
  <p>Contributions are welcome! Feel free to fork the repo and submit pull requests.</p>

  <h2>License</h2>
  <p>This project is licensed under MIT License.</p>
