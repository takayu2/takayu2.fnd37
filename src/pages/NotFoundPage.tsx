import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h1>404 - ページが見つかりません</h1>
        <p>お探しのページは存在しないか、移動された可能性があります。</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
          トップページへ戻る
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
