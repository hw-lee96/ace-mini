import React, { useState, useEffect, useRef } from "react";
import "./newsDetail.css";
import NewsCardS from "./component/newsCard_small";
import { useTheme } from "../theme/themeProvider";
import axios from "axios";
import useStore from "../commonStore";

const NewsDetail = () => {
  const [ThemeMode] = useTheme();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [sortedRecommendations, setSortedRecommendations] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { newsId, setNewsId, setIsOpen } = useStore();
  const detailRef = useRef(null); //디테일부분을 참조하기 위한 useRef

  // const newsChange = (article) => {
  //   setNewsId(article._id);
  // };
  useEffect(() => {
    //특정 아이디로 api 호출
    const get_detail = async () => {
      try {
        if (!newsId || newsId == 0) {
          return;
        }
        let rs = await axios.get(`api/news/detail/${newsId}`);
        const data = rs.data;

        // 선택 뉴스 출력
        console.log(rs.data);
        setSelectedArticle(data);

        // 긍부정출력
        const clsResults = JSON.parse(data.cls_results);
        const labelMap = {
          negative: "부정",
          neutral: "중립",
          positive: "긍정",
        };
        const formattedClsResults = Object.keys(clsResults)
          .map((key) => ({
            label: labelMap[key], // label값을 반환
            percentage: (clsResults[key] * 100).toFixed(1), //퍼센트 형식으로 반환
          }))
          .sort((a, b) => b.percentage - a.percentage); // 내림차순정렬
        setSortedRecommendations(formattedClsResults);

        // 현재회사와의 관련기사 설정
        const relatedRs = await axios.get(
          `api/news/related/${data.company_name}/${newsId}`
        );
        console.log(relatedRs.data);
        setRelatedArticles(relatedRs.data);

        // 스크롤을 최상단으로 이동
        if (setNewsId) {
          detailRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        console.error("에러낫슈", e);
      }
    };
    get_detail();
  }, [newsId]);

  //좋아요 수
  const handleLike = async () => {
    try {
      const response = await axios.put(`api/news/like/${newsId}`);
      setSelectedArticle((prevArticle) => ({
        ...prevArticle,
        like: response.data.new_like_count,
      }));
    } catch (e) {
      console.error("좋아요 수 에러 : ", e);
    }
  };

  if (!selectedArticle) return <div> Loading......... </div>;

  // 퍼센트에 따라 색상을 계산하는 함수
  const getBarColor = (percentage) => {
    const alpha = percentage / 100; // 0에서 1 사이의 값으로 변환
    return `rgba(112, 78, 255, ${alpha})`; // 보라색을 기반으로 투명도 조절
  };

  return (
    <div className="bodyWrap bgClass" ref={detailRef}>
      <div className="go-to-back detailBg">
        <div className="up-left" onClick={() => setIsOpen(0)}>
          <div>
            {ThemeMode === "dark" ? (
              <img
                className="back-arrow"
                src="./static/back_arrow_dark.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            ) : (
              <img
                className="back-arrow"
                src="./static/back_arrow.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            )}
          </div>
          <img
            className="small-img"
            src={selectedArticle.img}
            alt="title"
            onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
          />
          <span className="small-title">{selectedArticle.title}</span>
        </div>
        <div className="up-right">
          <div className="up-views-count">
            {ThemeMode === "dark" ? (
              <img
                className="up__views_img"
                src="./static/view-dark.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            ) : (
              <img
                className="up__views_img"
                src="./static/view-light.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            )}
            <div className="up-views purCard">{selectedArticle.views}</div>
          </div>
          <div onClick={handleLike} className="handle-like">
            {ThemeMode === "dark" ? (
              <img
                className="up__like_img"
                src="./static/heart-dark.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            ) : (
              <img
                className="up__like_img"
                src="./static/heart-light.png"
                alt=""
                onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
              />
            )}
            <div className="up-like purCard">{selectedArticle.like}</div>
          </div>
        </div>
      </div>
      <div className="newsDetailWrap detailBg">
        <img
          src={selectedArticle.img}
          alt="hello"
          className="news-detail__image"
          onError={(e) => (e.target.src = "./static/img_not_found.jpg")}
        />
        <h2 className="news-detail__title">{selectedArticle.title}</h2>
        <p className="news-detail__company-name">
          🏢 관련성이 높은 기업 : {selectedArticle.company_name}
        </p>

        <p className="news-detail__content-title"> </p>
        <p className="news-detail__content">
          📝 [ 한 줄 요약 ] <br /> {selectedArticle.summary}
        </p>
        <p className="news-detail__media">{selectedArticle.media}</p>

        <p className="news-detail__date">{selectedArticle.date}</p>

        {ThemeMode === "dark" ? (
          <a target="_blank" className="dark-mode__button" href={selectedArticle.link}>
            기사 본문 보러가기
          </a>
        ) : (
          <a target="_blank" className="news-detail__button" href={selectedArticle.link}>
            기사 본문 보러가기
          </a>
        )}
        <div className="news-detail__recommendations">
          <h3 className="related-articles">이 뉴스의 평가</h3>
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
                <span className="recommendation-percentage recText">
                  {rec.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="related-container reContainer">
        <h2 className="related-articles">
          🏢 [{selectedArticle.company_name}] 와(과) 관련된 최근 기사
        </h2>
        <div className="related-articles__list">
          {relatedArticles.map((article, index) => (
            <NewsCardS
              key={index}
              img={article.img}
              title={article.title}
              summary={article.summary}
              date={article.date}
              views={article.views}
              like={article.like}
              onClick={() => {
                setNewsId(article._id);
                if (detailRef.current) {
                  detailRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
