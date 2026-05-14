import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState<string>('checking...');

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => setStatus(`OK — ${data.time}`))
      .catch(() => setStatus('backend not reachable'));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Fantasy App</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;