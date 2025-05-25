import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useUser } from '../UserContext';

const isValidName = (name: string) => name.length >= 2;
const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const isValidPassword = (pw: string) => pw.length >= 8;

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const isFormValid =
    isValidName(name) && isValidEmail(email) && isValidPassword(password);

  const handleLogin = () => {
    setUser({ name, email });
    navigate('/booking');
  };

  return (
    <Layout>
      <div
        style={{
          padding: '2rem 3rem',
          backgroundColor: 'white',
          width: '15rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2>ログイン</h2>
        <input
          placeholder="氏名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? '#4caf50' : '#ccc',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            marginTop: '1rem',
            cursor: isFormValid ? 'pointer' : 'default',
          }}
        >
          ログイン
        </button>
      </div>
    </Layout>
  );
};

export default LoginPage;
