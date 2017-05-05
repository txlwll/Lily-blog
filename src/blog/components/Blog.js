import React from 'react'
import {
    Route,
} from 'react-router-dom'
import NavBar from './NavBar'
import BlogCategory from './BlogCategory'
import BlogContent from './BlogContent'
import BlogDetailList from './BlogDetailLists'
import './css/blog.css'

class Blog extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <div className="blogBody">
                <div className="header">
                    <NavBar />
                </div>
                <div className="blogContainer">
                    <div className="left-list">
                        <BlogCategory />
                    </div>
                    <div className="right-list">
                        <Route exact path={`${match.url}`} component={BlogDetailList}/>
                        <Route path={`${match.url}/:id`} component={BlogContent}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog