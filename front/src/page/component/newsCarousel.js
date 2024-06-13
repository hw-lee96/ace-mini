import { React} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./newsCarousel.css";

import NewsCard from "./newsCard";

const relatedArticles = [
    {
        image:
            "https://imgnews.pstatic.net/image/277/2024/06/13/0005431172_001_20240613090716062.jpg?type=w647",
        title: "삼성전자 노사, 오늘 대화 재개…갈등 봉합 여부 주목",
        publishedAt: "2024.06.13 09:05",
        content:
            "삼성전자 노사가 13일 오전 10시부터 서울 서초사옥 인근 모처에서 만나 본교섭 일정과 논의 방향 등에 대해 의견을 나눈다.",
    },
    {
        image:
            "https://imgnews.pstatic.net/image/421/2024/06/13/0007598064_001_20240613061310646.jpg?type=w647",
        title: "'갓비디아 수혜주' 한미반도체, LG전자 시총 제치며 '고공행진'",
        publishedAt: " 2024.06.13 06:12",
        content:
            "AI 반도체인 고대역폭메모리(HBM) 후공정에 필수적인 열압착(Thermal Compression) 본더를 생산하는 한미반도체 주가가 역대 최고가를 또 한 번 갈아치우며 LG전자 시가총액을 제쳤다.",
    },
    {
        image:
            "https://imgnews.pstatic.net/image/277/2024/06/13/0005431172_001_20240613090716062.jpg?type=w647",
        title: "삼성전자 노사, 오늘 대화 재개…갈등 봉합 여부 주목",
        publishedAt: "2024.06.13 09:05",
        content:
            "삼성전자 노사가 13일 오전 10시부터 서울 서초사옥 인근 모처에서 만나 본교섭 일정과 논의 방향 등에 대해 의견을 나눈다.",
    },
    {
        image:
            "https://imgnews.pstatic.net/image/421/2024/06/13/0007598064_001_20240613061310646.jpg?type=w647",
        title: "'갓비디아 수혜주' 한미반도체, LG전자 시총 제치며 '고공행진'",
        publishedAt: " 2024.06.13 06:12",
        content:
            "AI 반도체인 고대역폭메모리(HBM) 후공정에 필수적인 열압착(Thermal Compression) 본더를 생산하는 한미반도체 주가가 역대 최고가를 또 한 번 갈아치우며 LG전자 시가총액을 제쳤다.",
    }
];

const NewsCarousel = () => {
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
                {relatedArticles.map((article, index) => (
                    <SwiperSlide key={index}>
                        <NewsCard
                            image={article.image}
                            title={article.title}
                            content={article.content}
                            publishedAt={article.publishedAt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}



export default NewsCarousel