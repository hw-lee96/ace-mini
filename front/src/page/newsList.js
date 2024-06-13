import React, { useState } from 'react'
import "./newsList.css";


const newsList = () => {
    return (
        <div>
            <div className="item">
                <div className="img-box">
                    <img src="./1.jpg" />
                </div>
                <div className="article-container">
                    {/* <!-- 새로운 컨테이너 추가 --> */}
                    <div>
                        <div className="title">나는 멋있게 추락하고 있는거야 : 2023년 회고</div>
                        <div className="content content-line-clamp">
                            <span className="gray-color content-font">
                                2023년 한 해를 상징하는 단어를 떠올려 보라고 한다면 나는 ‘고통’이라는 단어를 꼽고 싶다.
                                그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 몇 장의 더단어를 단어를
                                단어를 단어를단어를 단어를 단어를 단어를
                            </span>
                        </div>
                    </div>
                    <div className="date-font">2023-12-23</div>
                    {/* <!-- 이 부분이 맨 아래에 오도록 변경 --> */}
                </div>
            </div>
            <div className="item">
                <div className="img-box">
                    <img src="./1.jpg" />
                </div>
                <div className="article-container">
                    {/* <!-- 새로운 컨테이너 추가 --> */}
                    <div>
                        <div className="title">나는 멋있게 추락하고 있는거야 : 2023년 회고</div>
                        <div className="content content-line-clamp">
                            <span className="gray-color content-font">
                                2023년 한 해를 상징하는 단어를 떠올려 보라고 한다면 나는 ‘고통’이라는 단어를 꼽고 싶다.
                                그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 몇 장의 더단어를 단어를
                                단어를 단어를단어를 단어를 단어를 단어를
                            </span>
                        </div>
                    </div>
                    <div className="date-font">2023-12-23</div>
                    {/* <!-- 이 부분이 맨 아래에 오도록 변경 --> */}
                </div>
            </div>
            <div className="item">
                <div className="img-box">
                    <img src="./1.jpg" />
                </div>
                <div className="article-container">
                    {/* <!-- 새로운 컨테이너 추가 --> */}
                    <div>
                        <div className="title">나는 멋있게 추락하고 있는거야 : 2023년 회고</div>
                        <div className="content content-line-clamp">
                            <span className="gray-color content-font">
                                2023년 한 해를 상징하는 단어를 떠올려 보라고 한다면 나는 ‘고통’이라는 단어를 꼽고 싶다.
                                그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 꼽고 싶다. 그리고 몇 장의 더단어를 단어를
                                단어를 단어를단어를 단어를 단어를 F단어를
                            </span>
                        </div>
                    </div>
                    <div className="date-font">2023-12-23</div>
                    {/* <!-- 이 부분이 맨 아래에 오도록 변경 --> */}
                </div>
            </div>
        </div>
    )
}

export default newsList
