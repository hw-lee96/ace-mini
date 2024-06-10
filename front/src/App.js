import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('news?question=bitcoin',
            { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
        console.log('response.data : ',response.data)
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>News Data</h2>
      <div>{JSON.stringify(news)}</div>
    </div>
  );
};

export default UserList;
