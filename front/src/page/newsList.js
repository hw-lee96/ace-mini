import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newsList.css'

const NewsList = () => {
    const [newsList, setNewsList] = useState([])

    const getAllNewsList = async () => {
        try {
            let page = 1
            const response = await axios.get(`api/news/list/${page}`)
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
            <div className='news-filter'>
                <div onClick={ getAllNewsList } className='active'>전체</div>
                {/* <div onClick={() => filter('positive')}>긍정</div> */}
                {/* <div onClick={() => filter('neutral')}>중립</div> */}
                {/* <div onClick={() => filter('negative')}>부정</div> */}
                {/* <div>전체</div> */}
                <div>긍정</div>
                <div>중립</div>
                <div>부정</div>
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
                                        <span className="gray-color content-font">[한 줄 요약] 📝{news.summary}</span>
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
