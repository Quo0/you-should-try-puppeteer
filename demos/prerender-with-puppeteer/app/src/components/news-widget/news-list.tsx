import React, { useState } from 'react';
import { INewsPost } from './interfaces';
import './news-list.css';

type NewsListProps = {
  posts: INewsPost[];
}

interface IExpandedPosts {
  [index: string]: boolean;
}

export default function NewsList({ posts }: NewsListProps):JSX.Element {
  
  const [expandedPosts, setExpandedPosts] = useState<IExpandedPosts>({});

  const expandPost = (id:string):void => {
    const newExpandedPosts = {
      ...expandedPosts,
      [id]: !expandedPosts[id]
    };

    setExpandedPosts(newExpandedPosts);
  };

  return (
    <div className="news-list">
      {posts.map(({ id, title, description, url, urlToImage, content, source }) => (
        <div className="news-post" key={id}>
          <h3 className="news-post__title">{title}</h3>
          <p className="news-post__description">{description}</p>
          <a href={url}>
            {
              urlToImage
              ? <img className="news-post__img" src={urlToImage} />
              : <p>Link to page</p>
            }
          </a>
          <button
            className="news-post__expand-button"
            onClick={expandPost.bind(null, id)}
          >read more</button>
          {
            expandedPosts[id] &&
            <div>
              <p>Original post: <a href={url}>{source.name}</a></p>
              <p>{content || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolorum architecto, ab nihil esse voluptate, itaque obcaecati expedita est eaque assumenda quaerat quae consequatur, reiciendis veritatis maiores doloribus cum minima voluptatibus pariatur consequuntur adipisci nobis? Natus dolorem voluptatem, voluptas omnis facilis culpa nobis earum sunt accusamus iusto, asperiores pariatur sed.'}</p>
            </div>
          } 
        </div>
      ))}
    </div>
  );
};