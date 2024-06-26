import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './newsCarousel.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NewsCard from './newsCard'
import useStore from '../../commonStore'
import { useTheme } from '../../theme/themeProvider'

async function getArticles(type) {
    try {
        const response = await axios.get(`api/news/ranking/${type}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

function NewsCarousel({ type }) {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const { setNewsId, setIsOpen } = useStore()
    const [ThemeMode] = useTheme()

    const [relatedArticles, setRelatedArticles] = useState([])

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
        <div className="swiper-container">
            <div className="swiper-top-wrap">
                <div className="titleWrap">
                    <div className="title">
                        {type === 'like' ? '사람들이 가장 좋아한 뉴스' : '사람들이 가장 많이 본 뉴스'}
                    </div>
                </div>
                <div className="swiper-button-wrap">
                    <div
                        className="swiper-button-prev custom-nav-button "
                        style={{ marginRight: '10px' }}
                        ref={prevRef}
                    >
                        <img
                            src={ThemeMode == 'dark' ? '/static/prevBtn_dark.png' : '/static/prevBtn_light.png'}
                            alt="Previous"
                        />
                    </div>
                    <div className="swiper-button-next custom-nav-button" ref={nextRef}>
                        <img
                            src={ThemeMode == 'dark' ? '/static/nextBtn_dark.png' : '/static/nextBtn_light.png'}
                            alt="Previous"
                        />
                    </div>
                </div>
            </div>

            <div className="swiper-wrapper" style={{ flexDirection: 'column' }}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    slidesPerView={2.97}
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                        swiper.navigation.init()
                        swiper.navigation.update()
                    }}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500000,
                    }}
                >
                    {relatedArticles.map((article) => (
                        <SwiperSlide key={article._id}>
                            <Link
                                to="/list"
                                className="ftColor"
                                onClick={() => {
                                    setNewsId(article._id)
                                    setIsOpen(2)
                                }}
                            >
                                <NewsCard
                                    img={article.img}
                                    title={article.title}
                                    summary={article.summary}
                                    date={article.date}
                                    views={article.views}
                                    like={article.like}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default NewsCarousel
