import React from 'react'
import {
    Link
} from 'react-router-dom'
import './css/BlogItem.css'

class BlogItem extends React.Component {

    render() {
        const {blogData} = this.props
        return (
            <div className="blog-item">
                <div className="title">
                    <h3 className="blog-title">{blogData.title}</h3>
                    <p className="blog-date">{blogData.createDate}</p>
                </div>
                <div className="blog-content">
                    {blogData.blogTopic}
                    <Link to={`${this.props.match.url}/${blogData._id}`}>
                        <span className="read-all">&lt;&lt; 阅读全文</span>
                    </Link>
                </div>
                <div className="bottom-wrap">
                    <div className="wrap">
                        <span className="wrap-icon zan"></span>
                        <p><span>{blogData.support} </span>赞</p>
                    </div>
                    <div className="wrap">
                        <span className="wrap-icon pinglun"></span>
                        <p>评论 {blogData.comments.length}</p>
                    </div>
                    <div className="wrap">
                        <span className="wrap-icon scan"></span>
                        <p><span>{blogData.visits} </span>浏览</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogItem