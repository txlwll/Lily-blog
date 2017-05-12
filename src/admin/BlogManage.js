import React from 'react'
import {
    Link,
} from 'react-router-dom'
import _ from 'underscore'
import {Button,message,Input} from 'antd';
import './css/blogManage.css'

class BlogManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
            blogDatas: [],
            currentEditCategoryId: '',
            currentEditCategoryName: '',
            isAddCategory: false,
            newCategoryName: '',
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
                fetch('/blog-list')
                    .then(res => res.json())
                    .then(json => {
                        json.forEach(item => {
                            const tmp = _.find(categoryRes, {_id: item.categoryID})
                            item.categoryName = tmp ? tmp.categoryName : '其他'
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

    /**
     * 删除博客
     * @param item
     */
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

    handleEditCategory = (item) => {
        this.setState({
            currentEditCategoryId: item._id,
            currentEditCategoryName: item.categoryName,
        })
    }
    handleOnChangeCategoryName = (e) => {
        this.setState({
            currentEditCategoryName: e.target.value
        })
    }
    /**
     * 保存博客分类修改
     */
    handleSaveCategoryName = () => {
        const {currentEditCategoryId, categoryData, currentEditCategoryName} = this.state
        fetch(`/update-category/${currentEditCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoryName:currentEditCategoryName})
        })
            .then(res => res.json())
            .then(() => {
                const tmpCategory = _.find(categoryData, {_id: currentEditCategoryId})
                tmpCategory.categoryName = currentEditCategoryName
                this.setState({
                    categoryData: [...categoryData],
                    currentEditCategoryId: '',
                })
                message.success('保存成功');
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.setState({loading: false});
            })

    }

    handleSaveCategoryOnEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleSaveCategoryName()
        }
    }

    /**
     * 删除博客分类
     * @param item
     */
    handleOnDeleteCategory = (item) => {
        fetch(`/delete-category/${item._id}`,{
            method: 'delete',
        })
            .then(res => res.json())
            .then(json => {
                console.log('delete category' + json)
                const tmpIndex = _.findIndex(this.state.categoryData,{_id:item._id})
                if(tmpIndex > -1) {
                    this.state.categoryData.splice(tmpIndex,1)
                    this.setState({
                        categoryData:[...this.state.categoryData]
                    })
                }
                message.success('删除成功');
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.setState({loading: false});
            })
    }
    /**
     * 添加博客分类按钮
     */
    handleAddCategory = () => {
        this.setState({
            isAddCategory: true
        })
    }

    handleOnChangeCategory = (e) => {
        this.setState({
            newCategoryName: e.target.value
        })
    }

    handleOnAddSaveCategory = () => {
        if (!this.state.newCategoryName) {
            message.warning('添加分类必填')
            return;
        }
        const params = {
            categoryName: this.state.newCategoryName.trim(),
        }
        fetch('/add-category',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(json => {
                if (json.result.ok === 1 && json.result.n === 1) {
                    this.state.categoryData.push(json.ops[0])
                    this.setState({
                        categoryData: [...this.state.categoryData],
                        newCategoryName: '',
                    });
                    message.success('添加成功');
                }
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const {blogDatas,categoryData, currentEditCategoryId,currentEditCategoryName, newCategoryName,isAddCategory} = this.state
        // 博客列表
        const blogItems = blogDatas.map(item => {
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
        const categoryItems = categoryData.map(item => {
            const categoryName = item._id === currentEditCategoryId ?
                <Input type="text" className="edit-category" onKeyUp={this.handleSaveCategoryOnEnter}
                       onChange={this.handleOnChangeCategoryName}
                       value={currentEditCategoryName}/> :
                <p>{item.categoryName}&nbsp;&nbsp;
                    <sapn>({item.count || 0})</sapn>
                </p>

            return (
                <div key={item._id} className="admin-category-item">
                    {categoryName}
                    <div className="admin-category-msg">
                        {item._id === currentEditCategoryId ?
                            <p onClick={this.handleSaveCategoryName}>保存</p>
                            : <p onClick={() => this.handleEditCategory(item)}>编辑</p>}
                        <p onClick={() => this.handleOnDeleteCategory(item)}>删除</p>
                    </div>
                </div>
            )
        })

        const addCategoryBtn = isAddCategory ?
            <div className="add-category-box">
                <Input className="add-category-input" type="text" placeholder="添加分类"
                       value={newCategoryName}
                       onChange={this.handleOnChangeCategory}
                />
                <span className="add-icon save" onClick={this.handleOnAddSaveCategory}></span>
            </div>:
            <Button className="add-blog-category" type="primary" onClick={this.handleAddCategory}>
                添加分类
                <span className="add-icon"></span>
            </Button>

        return (
            <div>
                <div className="admin-header">
                    <h2>博客系统管理</h2>
                    <Link to={`${this.props.match.url}/add_blog`}>
                        <Button type="primary" className="add-blog-category new-blog">新增博客<span className="add-icon new-blog"></span></Button>
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
                            {addCategoryBtn}
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