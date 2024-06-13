import React from 'react'
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom'
import { ThemeProvider } from './theme/themeProvider'
import { GlobalStyle } from './theme/GlobalStyle'
import './App.css'

import Header from './page/header'
import NewsDetail from './page/newsDetail'
import NewsMain from './page/newsMain'

// const Home = () => (
//     <div>
//         <Link to="/">
//             <button>HOME</button>
//         </Link>
//         <Link to="/exer/hj">
//             <button>hj</button>
//         </Link>
//         <Link to="/exer/hw">
//             <button>hw</button>
//         </Link>
//         <Link to="/exer/jh">
//             <button>jh</button>
//         </Link>
//         <Link to="/exer/ra">
//             <button>ra</button>
//         </Link>
//         <Link to="/exer/yk">
//             <button>yk</button>
//         </Link>
//     </div>
// )

const App = () => {
    return useRoutes([
        { path: '/', element: <NewsDetail /> },
        { path: '/main', element: <NewsMain /> },
        // { path: '/exer/hw', element: <Todo2 /> },
        // { path: '/exer/jh', element: <Todo3 /> },
        // { path: '/exer/ra', element: <Todo4 /> },
        // { path: '/exer/yk', element: <Todo5 /> },
    ])
}

const AppWrapper = () => {
    return (
        <Router>
            <ThemeProvider>
                <GlobalStyle />
                <div className="container">
                    <Header />
                    <App />
                </div>
            </ThemeProvider>
        </Router>
    )
}

export default AppWrapper
