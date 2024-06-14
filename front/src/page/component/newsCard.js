// src/components/NewsCard.js
import React from "react";
import "./newsCard.css";

const NewsCard = ({ img, title, date, summary }) => {
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
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
        <p className="news-card__date">{date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
