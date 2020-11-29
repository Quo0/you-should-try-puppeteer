import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../services/News';
import { INewsPost } from './interfaces';
import NewsList from './news-list';
import './news-widget.css';

export default function NewsWidget():JSX.Element {
  const [newsPosts, setNewsPosts] = useState<INewsPost[]>([]);
  useEffect(() => {
    fetchPosts().then(setNewsPosts);
    
    // fetchPosts().then(r => {
    //   setTimeout(() => {
    //     setNewsPosts(r)
    //   }, 5000);
    // });
  }, []);

  return (
    <div className="news-widget">
      { 
        newsPosts.length
        ? <NewsList posts={newsPosts} />
        : <p className="news-widget__loading">Loading...</p>
      }
    </div>
  );
};