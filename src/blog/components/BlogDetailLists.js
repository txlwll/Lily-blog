import React from 'react'
import {Pagination} from 'antd'
import BlogItem from './BlogItem'
import './css/blogDetailLists.css'

class BlogDetailLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogDatas: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.fetchBlogList(nextProps.match.params.id)
        }
    }

    componentDidMount() {
        this.fetchBlogList(this.props.match.params.id)
    }

    fetchBlogList = (categoryId) => {
        this.props.setActiveCategoryId(categoryId ? categoryId : '')
        const query = categoryId ? `?categoryId=${categoryId}` : ''
        fetch('/blog-list' + query)
            .then(res => res.json())
            .then(json => {
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
    }

    // 分页
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    render() {
        console.log(this.state.blogDatas[0])
        const blogItemDatas = this.state.blogDatas.map((item, i) => {
            return <BlogItem
                key={i}
                blogData={item}
                match={this.props.match}
            />
        })
        return (
            <div className="blog-item-list">
                {blogItemDatas}
                <div className="bottom-pagination">
                    <Pagination showQuickJumper defaultCurrent={1} total={80} onChange={this.onChange}/>
                </div>
            </div>
        )
    }
}

export default BlogDetailLists