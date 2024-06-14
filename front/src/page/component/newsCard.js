// src/components/NewsCard.js
import React from "react";
import "./newsCard.css";
import { useTheme } from "../../theme/themeProvider";

const NewsCard = ({ img, title, date, views, like, summary }) => {
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const [ThemeMode] = useTheme();

  return (
    <div className="news-card recBar">
      <img src={img} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h4 className="news-card__title">{title}</h4>
        <p className="news-card__snippet">{truncateText(summary, 50)}</p>
        <div className="date_like">
          <p className="news-card__date">{date}</p>
          {ThemeMode === "dark" ? (
            <img
              className="news-card__views_img"
              src="./static/view-dark.png"
              alt=""
            />
          ) : (
            <img
              className="news-card__views_img"
              src="./static/view-light.png"
              alt=""
            />
          )}
          <p className="news-card__views purCard">{views}</p>
          {ThemeMode === "dark" ? (
            <img
              className="news-card__like_img"
              src="./static/heart-dark.png"
              alt=""
            />
          ) : (
            <img
              className="news-card__like_img"
              src="./static/heart-light.png"
              alt=""
            />
          )}
          <p className="news-card__like purCard">{like}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
