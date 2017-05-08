import React from 'react'
import './css/blogContent.css'


class BlogContent extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            blog: {
                blogContent: '', // 博客内容
                title: '', // 博客标题
                categoryID: '', // 博客分类
                createDate: '', // 博客发表日期
                support: '', // 赞
                comments: [], // 评论
                visits: '', // 访问量
            },
        }
    }

    componentDidMount() {
        const blogId = this.props.match.params.id
        if (blogId) {
            fetch('/blog/' + blogId)
                .then(res => res.json())
                .then(json => {
                    console.log('json', json)
                    this.setState({
                        blog: json
                    })
                })
                .catch(function (ex) {
                    console.log('parsing failed', ex)
                })
        }
    }


    render() {
        const { blog } = this.state
        return (
            <div className="article-content">
                <div className="title">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="create-date">{ blog.createDate && (new Date(blog.createDate)).toISOString().substr(0, 10) }</p>
                </div>
                <div className="bottom-wrap top-wrap">
                    <div className="top-wrap-left">
                        <div className="wrap">
                            <span className="wrap-icon zan"></span>
                            <p>赞 {blog.support} </p>
                        </div>
                        <div className="wrap">
                            <span className="wrap-icon pinglun"></span>
                            <p> {blog.comments.length} 评论</p>
                        </div>
                        <div className="wrap">
                            <span className="wrap-icon scan"></span>
                            <p>浏览 {blog.visits} </p>
                        </div>
                    </div>
                    <div className="top-wrap-right">
                        <p className="up-article">上一篇</p>
                        <span className="separator"> | </span>
                        <p className="next-article">下一篇: 醇等辅助预防老年疾</p>
                    </div>
                </div>
                <div className="content">
                    {blog.blogContent}
                </div>
                <div className="comment-box">
                    <h3 className="comment-title">评论：</h3>
                    <textarea className="comment-input" name="" id=""></textarea>
                    <div className="btn-box">
                        <button className="submit-comment">发表评论</button>
                    </div>
                </div>
                <div className="comment-list">
                    评论列表 :
                </div>
            </div>
        )
    }
}


export default BlogContent