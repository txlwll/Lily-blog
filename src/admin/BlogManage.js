import React from 'react'
import {
    Link,
} from 'react-router-dom'
import _ from 'underscore'
import {Button} from 'antd';
import './css/blogManage.css'

class BlogManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
            blogDatas: [],
        }
    }

    componentDidMount() {
        // 发请求获取分类数据
        fetch('/category')
            .then(res => res.json())
            .then(categoryRes => {
                this.setState({
                    categoryData: categoryRes,
                }, () => {
                    console.log(this.state.categoryData)
                })
                // 发请求获取博客数据
                fetch('/blogList')
                    .then(res => res.json())
                    .then(json => {
                        json.forEach(item => {
                            item.categoryName = _.find(categoryRes, {_id: item.categoryID}).categoryName
                        })
                        this.setState({
                            blogDatas: json,
                        }, () => {
                            console.log(this.state.blogDatas)
                        })
                        console.log('parsed json', json)
                    })
                    .catch(function (ex) {
                        console.log('parsing failed', ex)
                    })

            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    handleOnDeleteBlog = (item) => {
        fetch(`/delete-blog/${item._id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log('parsed json', json)
                const tempIndex = _.findIndex(this.state.blogDatas, {_id: item._id})
                if (tempIndex > -1) {
                    this.state.blogDatas.splice(tempIndex, 1);
                    this.setState({
                        blogDatas: [...this.state.blogDatas]
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.setState({loading: false});
            })


    }

    render() {
        // 博客列表
        const blogItems = this.state.blogDatas.map(item => {
            return (
                <div key={item._id} className="admin-blog-item">
                    <p>{item.title}</p>
                    <div className="admin-tab-right item-title">
                        <p>( {item.visits} )</p>
                        <p>{item.createDate}</p>
                        <p>{item.categoryName}</p>
                        <p>
                            <span>预览</span>
                            <Link to={`${this.props.match.url}/edit_blog/${item._id}`}>
                                <span>编辑</span>
                            </Link>
                            <span onClick={()=>this.handleOnDeleteBlog(item)}>删除</span>
                        </p>
                    </div>
                </div>
            )
        })

        // 分类列表
        const categoryItems = this.state.categoryData.map(item => {
            return (
                <div key={item._id} className="admin-category-item">
                    <p>{item.categoryName}
                        <sapn>({item.count || 0})</sapn>
                    </p>
                    <div className="admin-category-msg">
                        <p>编辑</p>
                        <p>删除</p>
                    </div>
                </div>
            )
        })

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
                            {blogItems}
                        </div>
                    </div>
                    <div className="admin-category">
                        <div className="admin-tab">
                            <p>博客分类</p>
                            <Button type="primary" className="add-blog-category">添加分类<span className="add-icon"></span></Button>
                        </div>
                        <div className="admin-category-list">
                            {categoryItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogManage