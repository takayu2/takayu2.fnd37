import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useUser } from '../UserContext';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const time = query.get('time');
  const { user } = useUser();
  const name = user?.name ?? '未ログイン';

  const handleReserve = () => {
    alert('予約が完了しました');
    navigate('/');
  };

  return (
    <Layout>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'white',
          width: '15rem',
          height: '13rem',
          borderRadius: '10px',
        }}
      >
        <h2>予約確認</h2>
        <p>氏名: {name}</p>
        <p>予約日時: {time}</p>
        <button onClick={handleReserve} style={{ marginRight: '1rem' }}>
          予約する
        </button>
        <button onClick={() => navigate('/booking')}>キャンセル</button>
      </div>
    </Layout>
  );
};

export default ConfirmationPage;
