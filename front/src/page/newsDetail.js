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
    //특정 아이디로 api 호출
    const get_detail = async () => {
      try {
        let rs = await axios.get(`api/news/detail/${id}`);

        const data = rs.data;
        console.log(rs.data);
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
          .sort((a, b) => b.percentage - a.percentage); // 내림차순정렬

        setSortedRecommendations(formattedClsResults);

        // 현재회사와의 관련기사 설정
        const relatedRs = await axios.get(
          `api/news/related/${data.company_name}/${id}`
        );
        setRelatedArticles(relatedRs.data);
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
