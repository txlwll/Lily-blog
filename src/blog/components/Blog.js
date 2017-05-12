import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import NavBar from './NavBar'
import BlogCategory from './BlogCategory'
import BlogContent from './BlogContent'
import BlogDetailList from './BlogDetailLists'
import './css/blog.css'

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: {
                blogContent: '', // 博客内容
                title: '', // 博客标题
                categoryID: '', // 博客分类
                createDate: '', // 博客发表日期
                support: '', // 赞
                comments: [], // 评论
                visits: '', // 访问量
            },
            activeCategoryId: '',
        }
    }

    setBlogDetail = (blogDetail) => {
        this.setState({
            blog: blogDetail
        })
        this.setActiveCategoryId(blogDetail.categoryID)
    }

    setActiveCategoryId = (categoryId) => {
        this.setState({
            activeCategoryId: categoryId
        })
    }

    render() {
        const {match} = this.props;
        return (
            <div className="blogBody">
                <div className="header">
                    <NavBar />
                </div>
                <div className="blogContainer">
                    <div className="left-list">
                        <BlogCategory match={match} activeCategoryId={this.state.activeCategoryId}/>
                    </div>
                    <div className="right-list">
                        <Route exact
                               path={`${match.url}`}
                               render={(props) => (
                                   <BlogDetailList
                                       {...props}
                                       setActiveCategoryId={this.setActiveCategoryId}
                                   />
                               )}
                        />
                        <Route exact path={`${match.url}/:id`}
                               render={(props) => (
                                   <BlogContent
                                       {...props}
                                       blog={this.state.blog}
                                       setBlogDetail={this.setBlogDetail}
                                   />
                               )}
                        />
                        <Route path={`${match.url}/category/:id`}
                               render={(props) => (
                                   <BlogDetailList
                                       {...props}
                                       setActiveCategoryId={this.setActiveCategoryId}
                                   />
                               )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog