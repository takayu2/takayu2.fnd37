import React from 'react';
import Layout from '../components/Layout';
import './GuidePage.css';

const GuidePage: React.FC = () => {
  return (
    <Layout>
      <h1>診療案内</h1>
      <p>当院の診療時間は以下の通りです。</p>

      <table className="timetable">
        <thead>
          <tr>
            <th>曜日</th>
            <th>午前（8:00〜12:00）</th>
            <th>午後（13:00〜16:00）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>月曜</td>
            <td>○</td>
            <td>○</td>
          </tr>
          <tr>
            <td>火曜</td>
            <td>○</td>
            <td>○</td>
          </tr>
          <tr>
            <td>水曜</td>
            <td>○</td>
            <td>－</td>
          </tr>
          <tr>
            <td>木曜</td>
            <td>○</td>
            <td>○</td>
          </tr>
          <tr>
            <td>金曜</td>
            <td>○</td>
            <td>○</td>
          </tr>
          <tr>
            <td>土曜</td>
            <td>○</td>
            <td>－</td>
          </tr>
          <tr>
            <td>日曜</td>
            <td>－</td>
            <td>－</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default GuidePage;
