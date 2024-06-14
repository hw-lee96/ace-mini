import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './newsCarousel.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NewsCard from './newsCard'
import useStore from '../../commonStore'

async function getArticles(type) {
    try {
        const response = await axios.get(`api/news/ranking/${type}`)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

function NewsCarousel({ type }) {
    const [relatedArticles, setRelatedArticles] = useState([])
    const { setNewsId, setIsOpen } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArticles(type)
                if (data && data.length > 0) {
                    setRelatedArticles(data)
                } else {
                    console.warn('Fetched data is empty:', data)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    // 데이터가 비어있는 경우 처리
    if (relatedArticles.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                slidesPerView={1.9}
                spaceBetween={20}
                navigation={true}
                pagination={true}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                }}
                style={{ width: '100%', height: '300px' }}
            >
                {relatedArticles.map((article) => (
                    <SwiperSlide key={article._id}>
                        <Link to="/list" className="ftColor">
                            <NewsCard
                                img={article.img}
                                title={article.title}
                                summary={article.summary}
                                date={article.date}
                                onClick={() => {
                                    setNewsId(article._id)
                                    setIsOpen(true)
                                }}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default NewsCarousel
