import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './newsMain.css'

import NewsCarousel from './component/newsCarousel'
import { useTheme } from '../theme/themeProvider'

import useStore from '../commonStore'

const Main = () => {
    const [ThemeMode, toggleTheme] = useTheme()
    const { setHasFixedBottom } = useStore()

    useEffect(() => {
        setHasFixedBottom(true)
    }, [])


    return (
        <div className="mainWrap">
            <div className="content">
                <div className="most-liked-news newsWrap">
                    <div className="titleWrap">
                        <div className="title">사람들이 가장 좋아한 글</div>
                    </div>
                    <div className="news-carousel">
                        <NewsCarousel />
                    </div>
                </div>

                <div className="most-viewed-news newsWrap">
                    <div className="titleWrap">
                        <div className="title">사람들이 가장 많이 본 글</div>
                    </div>
                    <div className="news-carousel">
                        <NewsCarousel />
                    </div>
                </div>
            </div>
            <div className="news-main-footer">
                <div className="info">
                    <div>더 자세하고 많은 뉴스가</div>
                    <div>궁금하다면?</div>
                </div>
                <Link to="/list" className='ftColor'>
                    <div className="move-btn">
                        보러가기
                        {ThemeMode == 'dark' ? (
                            <img className="darkBtn" src="./static/halfArrow_dark.png" alt="" />
                        ) : (
                            <img className="lightBtn" src="./static/halfArrow_light.png" alt="" />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Main
