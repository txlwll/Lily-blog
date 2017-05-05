import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Blog from './blog/components/Blog'
import Login from './admin/Login'
import Admin from './admin/Admin'

const Home = () => (
    <Link to="/blog">
        <div className="homePage">
            <p>我是丸子姐姐</p>
            <h1>Welcome To My Blog!</h1>
        </div>
    </Link>
)

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="home">
                    <Route exact path="/" render={Home}/>
                    <Route path="/blog" component={Blog} />
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                </div>
            </Router>
        )
    }
}
export default App
