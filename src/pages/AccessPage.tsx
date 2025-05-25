import React from 'react';
import Layout from '../components/Layout';
import './AccessPage.css';

const AccessPage: React.FC = () => {
  return (
    <Layout>
      <h1>アクセス</h1>
      <p>高橋クリニックへのアクセスはこちらです。</p>

      <div className="map-container">
        <img src="/imgs/map.jpg" className="map-image" />
      </div>
    </Layout>
  );
};

export default AccessPage;
