// src/components/NewsCard.js
import React, { useState } from "react";
import "./newsCard.css";
import { useTheme } from "../../theme/themeProvider";
import useStore from "../../commonStore";

const NewsCard = ({ id, img, title, date, views, like, summary, onClick }) => {
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const [ThemeMode] = useTheme();

  return (
    <div className="news-card recBar" onClick={() => onClick(id)}>
      <img src={img} alt={title} className="news-card__image" onError={(e) => e.target.src = "./static/img_not_found.jpg"}/>
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
              onError={(e) => e.target.src = "./static/img_not_found.jpg"}
            />
          ) : (
            <img
              className="news-card__views_img"
              src="./static/view-light.png"
              alt=""
              onError={(e) => e.target.src = "./static/img_not_found.jpg"}
            />
          )}
          <p className="news-card__views purCard">{views}</p>
          {ThemeMode === "dark" ? (
            <img
              className="news-card__like_img"
              src="./static/heart-dark.png"
              alt=""
              onError={(e) => e.target.src = "./static/img_not_found.jpg"}
            />
          ) : (
            <img
              className="news-card__like_img"
              src="./static/heart-light.png"
              alt=""
              onError={(e) => e.target.src = "./static/img_not_found.jpg"}
            />
          )}
          <p className="news-card__like purCard">{like}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
