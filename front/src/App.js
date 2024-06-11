import React from 'react'
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom'
import Todo1 from './exer/hj/todo'
import Todo2 from './exer/hw/todo'
import Todo3 from './exer/jh/todo'
import Todo4 from './exer/ra/todo'
import Todo5 from './exer/yk/todo'

const Home = () => (
    <div>
        <Link to="/">
            <button>HOME</button>
        </Link>
        <Link to="/exer/hj">
            <button>hj</button>
        </Link>
        <Link to="/exer/hw">
            <button>hw</button>
        </Link>
        <Link to="/exer/jh">
            <button>jh</button>
        </Link>
        <Link to="/exer/ra">
            <button>ra</button>
        </Link>
        <Link to="/exer/yk">
            <button>yk</button>
        </Link>
    </div>
)

const App = () => {
    return useRoutes([
        { path: '/', element: <div><h2>Main Page</h2></div> },
        { path: '/exer/hj', element: <Todo1 /> },
        { path: '/exer/hw', element: <Todo2 /> },
        { path: '/exer/jh', element: <Todo3 /> },
        { path: '/exer/ra', element: <Todo4 /> },
        { path: '/exer/yk', element: <Todo5 /> },
    ])
}

const AppWrapper = () => {
    return (
        <Router>
            <Home />
            <App />
        </Router>
    )
}

export default AppWrapper
