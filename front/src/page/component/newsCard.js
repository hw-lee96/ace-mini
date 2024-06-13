// src/components/NewsCard.js
import React from "react";
import "./newsCard.css";

const NewsCard = ({ image, title, publishedAt, content }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h4 className="news-card__title">{title}</h4>
        <p className="news-card__snippet">{content}</p>
        <p className="news-card__date">{publishedAt}</p>
      </div>
    </div>
  );
};

export default NewsCard;
