import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newsList.css'
import { Link } from 'react-router-dom'
import NewsDetail from './newsDetail'
import useStore from '../commonStore'

const NewsList = () => {
    // 진입 시 & 전체 리스트 조회 관련 함수
    const [newsList, setNewsList] = useState([])
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

    // 필터 버튼 관련 함수
    const [type, setType] = useState('')
    const filter = async (type) => {
        try {
            setType(type)
            const response = await axios.get(`api/news/list/pinbert/${type}`)
            setNewsList(response.data || [])
        } catch (error) {
            console.error('Error fetching news list:', error)
        }
    }

    // 상세화면 슬라이드 관련
    const { newsId, setNewsId } = useStore()
    const { isOpen, setIsOpen } = useStore()
    const handleItemClick = (newsId) => {
        setNewsId(newsId)
        setIsOpen(true)
    }

    // 시작 시 실행
    useEffect(() => {
        getAllNewsList()
    }, [])

    return (
        <div className="news-list-container">
            <div className='dimm' onClick={()=>setIsOpen(false)}></div>
            <div className='news-list-box'>
                <div className="news-filter bgColor">
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
                <div className={`list-cover ${isOpen ? 'open' : ''}`}>
                    <div className={`news-list-wrap ${isOpen ? 'open' : ''}`}>
                        {newsList.map((news, i) => {
                            return (
                                <div key={i}>
                                    <div className="itemWrap compBg ftColor" onClick={() => handleItemClick(news.id)}>
                                        <div className="item compBg">
                                            <div className="img-box">
                                                <img
                                                    src={news.img}
                                                    alt=""
                                                    onError={(e) => (e.target.src = './static/img_not_found.jpg')}
                                                />
                                            </div>
                                            <div className="article-container">
                                                <div className="company-name-font">
                                                    🏢 관련성이 높은 기업 : {news.company_name}
                                                </div>
                                                <div>
                                                    <div className={`title ${isOpen ? 'content-line-clamp-1' : ''}`}>
                                                        {news.title}
                                                    </div>
                                                    <div className="content content-line-clamp-2">
                                                        <span className="gray-color content-font">
                                                            📝 [한 줄 요약] {news.summary}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="date-font">{news.date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={`panel ${isOpen ? 'open' : ''}`}>{newsId == 0 ? '' : <NewsDetail />}</div>
        </div>
    )
}

export default NewsList
