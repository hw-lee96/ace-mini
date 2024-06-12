
import React, { useState } from 'react'
import './newsDetail.css'
import apple from './img/apple.jpg'

const NewsDetail = () => {
    const [selectedArticle, setSelectedArticle] = useState({
        title: '애플 주가, AI 전략 공개 영향 7% 급등 사상 최고치…200불 돌파',
        author: '에이스일보',
        date: '2024-06-12',
        content: `(로스앤젤레스=연합뉴스) 임미나 특파원 = 애플이 자체 기기에 탑재될 인공지능(AI) 기능을 공개한 다음 날인 11일(현지시간) 주가가 급등해 사상 최고치를 경신했다.

                    이날 뉴욕증시에서 애플 주가는 전장보다 7.26% 오른 207.15달러에 마감했다.

                    마감 직전에는 207.16달러까지 올라 52주 신고가를 새로 썼다.`,
        recommendations: [
          { label: '긍정', percentage: 89.4 },
          { label: '부정', percentage: 0.1 },
          { label: '중립', percentage: 5.0 },
          
          
        ],
    });

    return (
        <div className='bodyWrap'>
            <div className='blank'></div>
            <div className='newsDetailWrap'>
                <img src={apple} alt='hello' className="news-detail__image" />
                <h2 className="news-detail__title">{selectedArticle.title}</h2>
                <p className="news-detail__author">{selectedArticle.author}</p>

                <p className="news-detail__date">{selectedArticle.date}</p>
                <p className="news-detail__content"> {selectedArticle.content} </p>
                <button className="news-detail__button">자세히 보기</button>
                <div className="news-detail__recommendations">
                    <h3>이 뉴스를 추천할게요</h3>
                    <ul>
                        {selectedArticle.recommendations.map((rec, index) => (
                         <li key={index} className="recommendation-item">
                            <span className="recommendation-label">{rec.label}</span>
                            <div className="recommendation-bar">
                            <div
                                className="recommendation-bar-inner"
                                style={{ width: `${rec.percentage}%` }}
                            ></div>
                            </div>
                            <span className="recommendation-percentage">{rec.percentage}%</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NewsDetail