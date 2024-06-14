import React, { useState } from 'react'
import './newsMain.css'

import NewsCarousel from './component/newsCarousel'

const Main = () => {
    return (
        <div className='mainWrap'>
            <div className='content'>
                <div className='most-liked-news'>
                    <div className='titleWrap'>
                        <div className='title'>사람들이 가장 좋아한 글</div>
                    </div>
                    <div className="news-carousel">
                        <NewsCarousel type="like"/>
                    </div>
                </div>
                <div className='most-viewed-news'>
                    <div className='titleWrap'>
                        <div className='title'>사람들이 가장 많이 본 글</div>
                    </div>
                    <div className="news-carousel">
                        <NewsCarousel type="view"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
