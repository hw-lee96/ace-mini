import React, { useState, useEffect } from "react";
import "./newsDetail.css";
import NewsCard from "./component/newsCard";
import { useTheme } from "../theme/themeProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [ThemeMode] = useTheme();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [sortedRecommendations, setSortedRecommendations] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const run = async () => {
      let rs = await axios.get("api/news/detail");
      console.log("rs : ", rs);
    };

    run();

    //특정 아이디로 api 호출
    const get_detail = async () => {
      try {
        let rs = await axios.get(`api/news/detail/${id}`);
        console.log("rs : ", rs);

        const data = rs.data;
        setSelectedArticle(data);

        const clsResults = JSON.parse(data.cls_results);
        const labelMap = {
          negative: "부정",
          neutral: "중립",
          positive: "긍정",
        };
        const formattedClsResults = Object.keys(clsResults)
          .map((key) => ({
            label: labelMap[key], // label값을 반환
            percentage: (clsResults[key] * 100).toFixed(2), //퍼센트 형식으로 반환
          }))
          .sort((a, b) => b.percentage - a.percentage);

        setSortedRecommendations(formattedClsResults);

        // Related articles 설정 (예시 데이터)
        setRelatedArticles([
          {
            image:
              "https://imgnews.pstatic.net/image/277/2024/06/13/0005431172_001_20240613090716062.jpg?type=w647",
            title: "삼성전자 노사, 오늘 대화 재개…갈등 봉합 여부 주목",
            publishedAt: "2024.06.13 09:05",
            summary:
              "삼성전자 노사가 13일 오전 10시부터 서울 서초사옥 인근 모처에서 만나 본교섭 일정과 논의 방향 등에 대해 의견을 나눈다.",
          },
          {
            image:
              "https://imgnews.pstatic.net/image/421/2024/06/13/0007598064_001_20240613061310646.jpg?type=w647",
            title:
              "'갓비디아 수혜주' 한미반도체, LG전자 시총 제치며 '고공행진'",
            publishedAt: " 2024.06.13 06:12",
            summary:
              "AI 반도체인 고대역폭메모리(HBM) 후공정에 필수적인 열압착(Thermal Compression) 본더를 생산하는 한미반도체 주가가 역대 최고가를 또 한 번 갈아치우며 LG전자 시가총액을 제쳤다.",
          },
        ]);
      } catch (e) {
        console.error("에러낫슈", e);
      }
    };
    get_detail();
  }, [id]);

  if (!selectedArticle) return <div> Loading......... </div>;

  // 퍼센트에 따라 색상을 계산하는 함수
  const getBarColor = (percentage) => {
    const alpha = percentage / 100; // 0에서 1 사이의 값으로 변환
    return `rgba(112, 78, 255, ${alpha})`; // 보라색을 기반으로 투명도 조절
  };

  return (
    <div className="bodyWrap bgClass">
      <div className="blank compBg"></div>
      <div className="newsDetailWrap compBg">
        <div className="go-to-back">
          <div>
            {ThemeMode === "dark" ? (
              <img
                className="back-arrow"
                src="./static/back_arrow_dark.png"
                alt=""
              />
            ) : (
              <img
                className="back-arrow"
                src="./static/back_arrow.png"
                alt=""
              />
            )}
          </div>
          <img className="small-img" src={selectedArticle.img} alt="title" />
          <span className="small-title">{selectedArticle.title}</span>
        </div>
        <img
          src={selectedArticle.img}
          alt="hello"
          className="news-detail__image"
        />
        <h2 className="news-detail__title">{selectedArticle.title}</h2>
        <p className="news-detail__author">{selectedArticle.media}</p>

        <p className="news-detail__content"> {selectedArticle.summary} </p>
        <p className="news-detail__date">{selectedArticle.date}</p>

        {ThemeMode === "dark" ? (
          <a className="dark-mode__button" href={selectedArticle.link}>
            기사 본문 보러가기
          </a>
        ) : (
          <a className="news-detail__button" href={selectedArticle.link}>
            기사 본문 보러가기
          </a>
        )}
        <div className="news-detail__recommendations">
          <h3>이 뉴스를 추천할게요</h3>
          <ul>
            {sortedRecommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">
                <span className="recommendation-label">{rec.label}</span>
                <div className="recommendation-bar recBar">
                  <div
                    className="recommendation-bar-inner"
                    style={{
                      width: `${rec.percentage}%`,
                      backgroundColor: getBarColor(rec.percentage),
                    }}
                  ></div>
                </div>
                <span className="recommendation-percentage">
                  {rec.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="related-articles">
          <h3>같이 보면 좋을 뉴스</h3>
          <div className="related-articles__list">
            {relatedArticles.map((article, index) => (
              <NewsCard
                key={index}
                img={article.img}
                title={article.title}
                summary={article.summary}
                date={article.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;

// const [selectedArticle] = useState({
//   title: "'AI 장착' 애플, MS 제치고 5개월 만에 장중 시총 1위 탈환",
//   media: "에이스일보",
//   img: "",
//   date: "2024-06-12",
//   summary: `(로스앤젤레스=연합뉴스) 임미나 특파원 = 애플이 자체 기기에 탑재될 인공지능(AI) 기능을 공개한 다음 날인 11일(현지시간) 주가가 급등해 사상 최고치를 경신했다.

//                   이날 뉴욕증시에서 애플 주가는 전장보다 7.26% 오른 207.15달러에 마감했다.

//                   마감 직전에는 207.16달러까지 올라 52주 신고가를 새로 썼다.(로스앤젤레스=연합뉴스) 임미나 특파원 = 애플이 자체 기기에 탑재될 인공지능(AI) 기능을 공개한 다음 날인 11일(현지시간) 주가가 급등해 사상 최고치를 경신했다.

//                   이날 뉴욕증시에서 애플 주가는 전장보다 7.26% 오른 207.15달러에 마감했다.

//                   마감 직전에는 207.16달러까지 올라 52주 신고가를 새로 썼다.`,
//   link: "https://www.yna.co.kr/view/AKR20240613001600091?input=1195m",
//   cls_result: [
//     { label: "긍정", percentage: 0.4 },
//     { label: "부정", percentage: 99.1 },
//     { label: "중립", percentage: 45.0 },
//   ],
// });

// const relatedArticles = [
//   {
//     img:
//       "https://imgnews.pstatic.net/image/277/2024/06/13/0005431172_001_20240613090716062.jpg?type=w647",
//     title: "삼성전자 노사, 오늘 대화 재개…갈등 봉합 여부 주목",
//     date: "2024.06.13 09:05",
//     summary:
//       "삼성전자 노사가 13일 오전 10시부터 서울 서초사옥 인근 모처에서 만나 본교섭 일정과 논의 방향 등에 대해 의견을 나눈다.",
//   },
//   {
//     img:
//       "https://imgnews.pstatic.net/image/421/2024/06/13/0007598064_001_20240613061310646.jpg?type=w647",
//     title: "'갓비디아 수혜주' 한미반도체, LG전자 시총 제치며 '고공행진'",
//     date: " 2024.06.13 06:12",
//     summary:
//       "AI 반도체인 고대역폭메모리(HBM) 후공정에 필수적인 열압착(Thermal Compression) 본더를 생산하는 한미반도체 주가가 역대 최고가를 또 한 번 갈아치우며 LG전자 시가총액을 제쳤다.",
//   },
// ];
