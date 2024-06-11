import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
    const [news, setNews] = useState()

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('news?question=bitcoin')
                if (
                    Array.isArray(response.data.top_headlines?.articles) &&
                    response.data.top_headlines?.articles.length > 0
                ) {
                    setNews(response.data.top_headlines.articles[0])
                } else {
                    setNews({title: JSON.stringify(response.data.news)})
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchNews()
    }, [])

    return (
        <div>
            <h2>News Data</h2>
            <div>
                <div>name : {news?.source?.name}</div>
                <div>author : {news?.author}</div>
                <div>title : {news?.title}</div>
                <div>publishedAt : {news?.publishedAt}</div>
            </div>
        </div>
    )
}

export default UserList
