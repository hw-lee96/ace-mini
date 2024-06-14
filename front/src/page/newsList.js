import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newsList.css'
import { Link } from 'react-router-dom'

const NewsList = () => {
    const [newsList, setNewsList] = useState([])
    const [type, setType] = useState('')

    const getAllNewsList = async () => {
        try {
            setType('')
            let page = 1
            const response = await axios.get(`api/news/list/${page}`)
            setNewsList(response.data || [])
        } catch (error) {
            console.error('Error fetching news list:', error)
        }
    }

    const filter = async (type) => {
        try {
            setType(type)
            const response = await axios.get(`api/news/list/pinbert/${type}`)
            setNewsList(response.data || [])
        } catch (error) {
            console.error('Error fetching news list:', error)
        }
    }

    useEffect(() => {
        getAllNewsList()
    }, [])

    return (
        <div>
            <div className="news-filter">
                <div className={type == '' ? 'active' : ''} onClick={getAllNewsList}>
                    전체
                </div>
                <div className={type == 'positive' ? 'active' : ''} onClick={() => filter('positive')}>
                    긍정
                </div>
                <div className={type == 'neutral' ? 'active' : ''} onClick={() => filter('neutral')}>
                    중립
                </div>
                <div className={type == 'negative' ? 'active' : ''} onClick={() => filter('negative')}>
                    부정
                </div>
            </div>

            <div>
                {newsList.map((news, i) => {
                    return (
                        <Link to={`/${news.id}`} className="ftColor">
                            <div key={i} className="item compBg">
                                <div className="img-box">
                                    <img src={news.img} alt="" />
                                </div>
                                <div className="article-container">
                                    <div>
                                        <div className="title">{news.title}</div>
                                        <div className="content content-line-clamp">
                                            <span className="gray-color content-font">
                                                📝[한 줄 요약]{news.summary}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="date-font">{news.date}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsList
