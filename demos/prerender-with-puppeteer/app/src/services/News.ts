import uuid from 'uuid/v4';
import { NEWS_API_KEY } from '../../private-data';

export const fetchPosts = () => {
  const query:string = 'mountain bike race';
  const url = 'https://newsapi.org/v2/everything?' +
              `q="${query}"&` +
              'sortBy=relevancy&' +
              `apiKey=${NEWS_API_KEY}`;

  const getUsefullData = ({ title, description, url, urlToImage, content, source }) => ({
    id: uuid(),
    title, 
    description,
    url, 
    urlToImage,
    content,
    source
  });     

  return fetch(url).then(r => r.json()).then(d => d.articles.map(getUsefullData));  
};

