import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './newsList.css'
import NewsDetail from './newsDetail'
import useStore from '../commonStore'

const NewsList = () => {
    const { newsId, setNewsId, isOpen, setIsOpen, closeSlide } = useStore()
    // 진입 시 & 전체 리스트 조회 관련 함수
    const [newsList, setNewsList] = useState([])
    const getAllNewsList = async () => {
        try {
            if (isOpen !== 2) {
                closeSlide()
            }
            setType('')
            let page = 1
            const response = await axios.get(`api/news/list/${page}`)
            setNewsList(listSort(response.data) || [])
            if (isOpen === 2) {
                setIsOpen(1)
            }
        } catch (error) {
            console.error('Error fetching news list:', error)
        }
    }

    // 필터 버튼 관련 함수
    const [type, setType] = useState('')
    const filter = async (type) => {
        try {
            closeSlide()
            setType(type)
            const response = await axios.get(`api/news/list/pinbert/${type}`)
            setNewsList(listSort(response.data) || [])
        } catch (error) {
            console.error('Error fetching news list:', error)
        }
    }

    const listSort = (list) => {
        return list.sort((a, b) => {
            // gif 우선
            if (a.img.indexOf('gif') > -1 && b.img.indexOf('gif') < 0) {
                return -1
            } else if ((a.img.indexOf('gif') > -1 && b.img.indexOf('gif') > -1) || (a.img.indexOf('gif') < 0 && b.img.indexOf('gif') < 0)) {
                let aa = new Date(a.date)
                let bb = new Date(b.date)
                // 날짜 비교
                if (aa > bb) {
                    return -1
                } else if (aa == bb) {
                    return 0
                } else {
                    return 1
                }
            }
        })
    }

    const handleItemClick = (newsId) => {
        setNewsId(newsId)
        setIsOpen(1)
    }

    const [isLongPress, setIsLongPress] = useState(false)
    const timerRef = useRef(null)

    const handleMouseDown = (newsId) => {
        timerRef.current = setTimeout(async () => {
            setIsLongPress(true)
            setNewsList(newsList.filter((e) => e.id != newsId))
            await axios.put(`api/news/delete/${newsId}`)
            alert('Delete Success')
        }, 1500)
    }

    const handleMouseUp = () => {
        // 마우스를 떼면 타이머 취소
        clearTimeout(timerRef.current)
        if (isLongPress) {
            setIsLongPress(false)
        }
    }

    const handleMouseLeave = () => {
        // 마우스를 버튼 밖으로 이동하면 타이머 취소
        clearTimeout(timerRef.current)
    }

    // 시작 시 실행
    useEffect(() => {
        getAllNewsList()
    }, [])

    return (
        <div className="news-list-container">
            <div className="dimm" onClick={() => setIsOpen(0)}></div>
            <div className="news-list-box">
                <div className="news-filter bgColor">
                    <div className={type === '' ? 'active' : ''} onClick={getAllNewsList}>
                        전체
                    </div>
                    <div className={type === 'positive' ? 'active' : ''} onClick={() => filter('positive')}>
                        긍정
                    </div>
                    <div className={type === 'neutral' ? 'active' : ''} onClick={() => filter('neutral')}>
                        중립
                    </div>
                    <div className={type === 'negative' ? 'active' : ''} onClick={() => filter('negative')}>
                        부정
                    </div>
                </div>
                <div className={`list-cover ${isOpen === 1 ? 'open' : ''}`}>
                    <div className={`news-list-wrap ${isOpen === 1 ? 'open' : ''}`}>
                        <div className="news-count">최신 뉴스 : {newsList.length}</div>
                        {Array.isArray(newsList) && newsList.length > 0 ? (
                            newsList.map((news, i) => {
                                return (
                                    <div key={i}>
                                        <div
                                            className="itemWrap compBg ftColor"
                                            onClick={() => handleItemClick(news.id)}
                                        >
                                            <div className="item compBg">
                                                <div className="img-box">
                                                    <img
                                                        src={news.img}
                                                        alt=""
                                                        onError={(e) => (e.target.src = './static/img_not_found.jpg')}
                                                        onMouseDown={() => handleMouseDown(news.id)}
                                                        onMouseUp={handleMouseUp}
                                                        onMouseLeave={handleMouseLeave}
                                                    />
                                                </div>
                                                <div className="article-container">
                                                    <div className="company-name-font">
                                                        🏢 관련성이 높은 기업 : {news.company_name}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className={`title ${
                                                                isOpen === 1 ? 'content-line-clamp-1' : ''
                                                            }`}
                                                        >
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
                            })
                        ) : (
                            <div>
                                <div className="itemWrap bgColor ftColor list-null">
                                    현재{' '}
                                    {type == 'positive'
                                        ? '긍정적인 '
                                        : type == 'neutral'
                                        ? '중립적인 '
                                        : type == 'negative'
                                        ? '부정적인 '
                                        : ''}
                                    뉴스기사가 없어요!
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`panel ${isOpen === 1 ? 'open' : ''}`}>{newsId == 0 ? '' : <NewsDetail />}</div>
        </div>
    )
}

export default NewsList
