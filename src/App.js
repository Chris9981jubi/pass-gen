// App.js
import React, { useState, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+{}[]|:";<>,.?/';
    let allChars = chars;
    if (includeNumbers) allChars += numbers;
    if (includeSpecialChars) allChars += specialChars;

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    setPassword(newPassword);
  }, [includeNumbers, includeSpecialChars, passwordLength]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="App">
      <h1>Secure Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input type="number" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
      </div>
      <div>
        <label>Include Numbers:</label>
        <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
      </div>
      <div>
        <label>Include Special Characters:</label>
        <input type="checkbox" checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} />
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div>
        <input type="text" value={password} ref={passwordRef} readOnly />
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    </div>
  );
}

export default App;
