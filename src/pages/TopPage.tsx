import React from 'react';
import Layout from '../components/Layout';
import './TopPage.css';

const TopPage: React.FC = () => {
  return (
    <Layout>
      <h1></h1>
      <p className="description">
        高橋クリニックは、地域の皆さまの「かかりつけ医」として、心のこもった医療を提供することを理念に掲げる個人病院です。
      </p>
    </Layout>
  );
};

export default TopPage;
