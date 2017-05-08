import React from 'react'
import 'whatwg-fetch'
import './css/blogCategory.css'

class BlogCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryData: [],
            showCategoryId: '',
        }
    }

    componentDidMount() {
        fetch('/category')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    categoryData: json,
                }, () => {
                    console.log(this.state.categoryData)
                })
                console.log('parsed json', json)
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    render() {
        const CategoryItem = this.state.categoryData.map((item, i) => {

            return (
                <div key={i}>
                    <div className="category-item">
                        <div className="category-item-left">
                            <span className="category-icon"></span>
                            <div className="item-content">
                                <p className="category-name">{item.categoryName}</p>
                                <p className="blog-num">{item.acticleCount}篇文章</p>
                            </div>
                        </div>
                        <span className="icon-back"></span>
                    </div>
                </div>
            )
        })
        return (
            <div className="blog-category-box">
                {CategoryItem}
            </div>
        )
    }
}

export default BlogCategory