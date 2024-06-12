
import React from 'react'
import './newsDetail.css'

const NewsDetail = () => {
    return (
        <div className='bodyWrap'>
            <div className='blank'></div>
            <div className='newsDetailWrap'>
                {/* <img src={article.image} alt={article.title} className="news-detail__image" />
                <h2 className="news-detail__title">{article.title}</h2>
                <p className="news-detail__date">{article.date}</p>
                <p className="news-detail__content">{article.content}</p>
                <button className="news-detail__button">자세히 보기</button>
                <div className="news-detail__recommendations">
                    <h3>이 뉴스를 추천할게요</h3>
                    <ul>
                    {article.recommendations.map((rec, index) => (
                        <li key={index}>
                        <span>{rec.label}</span>
                        <span>{rec.percentage}%</span>
                        </li>
                    ))}
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default NewsDetail