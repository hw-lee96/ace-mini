import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './newsCarousel.css'
import axios from 'axios'

import NewsCard from './newsCard'

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
      <div
        style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}
      >
        <div
          className="swiper-button-prev custom-nav-button "
          style={{ marginRight: '10px' }}
          ref={prevRef}
        >
          <img src="/static/prevBtn.png" alt="Previous" />
        </div>
        <div className="swiper-button-next custom-nav-button" ref={nextRef}>
          <img src="/static/nextBtn.png" alt="Next" />
        </div>
      </div>

      <div className="swiper-wrapper" style={{ flexDirection: 'column' }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          slidesPerView={1.9}
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
            delay: 2500,
          }}
          style={{ width: '100%', height: '340px', borderRadius: '15px' }}
        >
          {relatedArticles.map((article) => (
            <SwiperSlide key={article._id}>
              <NewsCard
                img={article.img}
                title={article.title}
                summary={article.summary}
                date={article.date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default NewsCarousel
