// src/components/NewsCard.js
import React from "react";
import "./newsCard.css";

const NewsCard = ({ img, title, date, like, summary }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="news-card">
      <img src={img} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h4 className="news-card__title">{title}</h4>
        <p className="news-card__snippet">{truncateText(summary, 70)}</p>
        <div className="date_like">
          <p className="news-card__date">{date}</p>
          <img
            className="news-card__like_img"
            alt=""
            src="./static/heart_light.png"
          />
          <p className="news-card__like">{like}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
