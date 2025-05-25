import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const times = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
];

const getNext7Days = () => {
  const days = [];
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const label = `${date.getMonth() + 1}/${date.getDate()}(${
      weekdays[date.getDay()]
    })`;
    days.push({
      label,
      dayIndex: date.getDay(),
    });
  }
  return days;
};

const BookingPage: React.FC = () => {
  const dates = getNext7Days();

  const isClosed = (dayIndex: number, time: string) => {
    if (dayIndex === 0) return true; // Sunday
    if ((dayIndex === 3 || dayIndex === 6) && time >= '13:00') return true; // Wednesday or Saturday afternoon
    return false;
  };

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        <h2>予約日時を選択してください</h2>
        <table
          style={{ backgroundColor: '#ffffff', borderCollapse: 'collapse' }}
          border={1}
        >
          <thead>
            <tr>
              <th>時間</th>
              {dates.map((date) => (
                <th key={date.label}>{date.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {dates.map((date) => (
                  <td key={date.label + time}>
                    {isClosed(date.dayIndex, time) ? (
                      'ー'
                    ) : Math.random() > 0.7 ? (
                      <Link
                        to={`/confirm?time=${encodeURIComponent(
                          `${date.label} ${time}`
                        )}`}
                      >
                        〇
                      </Link>
                    ) : (
                      '×'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BookingPage;
