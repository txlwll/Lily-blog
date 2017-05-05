import React from 'react'
import {
    Link,
} from 'react-router-dom'
import {Button} from 'antd';
import './css/blogManage.css'

class BlogManage extends React.Component {
    render() {
        return (
            <div>
                <div className="admin-header">
                    <h2>博客系统管理</h2>
                    <Link to={`${this.props.match.url}/add_blog`}>
                        <Button type="primary" className="add-blog-category new-blog">新增博客<span
                            className="add-icon new-blog"></span></Button>
                    </Link>
                </div>
                <div className="admin-manage">
                    <div className="admin-blog">
                        <div className="admin-tab">
                            <p className="title-tab">标题</p>
                            <div className="admin-tab-right">
                                <p>浏览</p>
                                <p>发表时间</p>
                                <p>类</p>
                                <p>操作</p>
                            </div>
                        </div>
                        <div className="admin-blog-list">
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                            <div className="admin-blog-item">
                                <p>致我逝去的青涩时光</p>
                                <div className="admin-tab-right item-title">
                                    <p>( 0 )</p>
                                    <p>2015-10-10</p>
                                    <p>react</p>
                                    <p>
                                        <span>预览</span>
                                        <Link to={`${this.props.match.url}/add_blog`}>
                                            <span>编辑</span>
                                        </Link>
                                        <span>删除</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-category">
                        <div className="admin-tab">
                            <p>博客分类</p>
                            <Button type="primary" className="add-blog-category">添加分类<span className="add-icon"></span></Button>
                        </div>
                        <div className="admin-category-list">
                            <div className="admin-category-item">
                                <p>个人日记
                                    <sapn>(0)</sapn>
                                </p>
                                <div className="admin-category-msg">
                                    <p>编辑</p>
                                    <p>删除</p>
                                </div>
                            </div>
                            <div className="admin-category-item">
                                <p>养生
                                    <sapn>(0)</sapn>
                                </p>
                                <div className="admin-category-msg">
                                    <p>编辑</p>
                                    <p>删除</p>
                                </div>
                            </div>
                            <div className="admin-category-item">
                                <p>技术
                                    <sapn>(0)</sapn>
                                </p>
                                <div className="admin-category-msg">
                                    <p>编辑</p>
                                    <p>删除</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogManage