import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newsList.css'

const NewsList = () => {
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        const fetchNewsList = async () => {
            try {
                let page = 1
                const response = await axios.get(`api/news/list/${page}`)
                setNewsList(response.data || [])
            } catch (error) {
                console.error('Error fetching news list:', error)
            }
        }

        fetchNewsList()
    }, [])

    

    return (
        <div>
            <div className='news-filter'>

            </div>

            <div>
                {newsList.map((news, i) => {
                    return (
                        <div key={i} className="item compBg">
                            <div className="img-box">
                                <img src={news.img} alt=''/>
                            </div>
                            <div className="article-container">
                                <div>
                                    <div className="title">{news.title}</div>
                                    <div className="content content-line-clamp">
                                        <span className="gray-color content-font">{news.summary}</span>
                                    </div>
                                </div>
                                <div className="date-font">{news.date}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsList
