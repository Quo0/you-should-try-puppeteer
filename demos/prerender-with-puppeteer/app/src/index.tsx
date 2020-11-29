import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import NewsWidget from './components/news-widget/news-widget';
import './index.css';

export default function App(): JSX.Element {
  return (
    <div className="mtb-news">
      <Header />
      <NewsWidget />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);
 