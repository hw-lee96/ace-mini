// src/components/NewsCard.js
import React from "react";
import "./newsCard.css";

const NewsCard = ({ img, title, publishedAt, summary }) => {
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
        <p className="news-card__snippet">{truncateText(summary, 50)}</p>
        <p className="news-card__date">{publishedAt}</p>
      </div>
    </div>
  );
};

export default NewsCard;
