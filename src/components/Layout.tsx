import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout-root">
      <div className="layout-inner">
        {/* 背景画像 */}
        <img
          src="/imgs/takahashi_clinic.jpg"
          alt="高橋クリニック トップバナー"
          className="top-image"
        />
        <div className="top-image-gradient" />

        {/* ナビゲーション */}
        <nav className="nav-bar">
          <Link
            to="/"
            className={`nav-button ${
              location.pathname === '/' ? 'active' : ''
            }`}
          >
            HOME
          </Link>
          <Link
            to="/guide"
            className={`nav-button ${
              location.pathname === '/guide' ? 'active' : ''
            }`}
          >
            診療案内
          </Link>
          <Link
            to="/book"
            className={`nav-button ${
              location.pathname === '/book' ? 'active' : ''
            }`}
          >
            診療予約
          </Link>
          <Link
            to="/access"
            className={`nav-button ${
              location.pathname === '/access' ? 'active' : ''
            }`}
          >
            アクセス
          </Link>
        </nav>

        {/* コンテンツ（画像の上・ボタンの下に表示） */}
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
