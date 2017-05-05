import React from 'react'
import {Input} from 'antd';
import {Select, Button, Upload, Modal} from 'antd';
const Option = Select.Option;
import marked from 'marked'
import './css/editBlog.css'
import 'highlight.js/styles/atom-one-dark.css'
marked.setOptions({
    langPrefix: 'hljs ',
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

class EditBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultCategoryName: '选择分类',
            // 图片上传
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            // 保存
            loading: false,
            iconLoading: false,

            blogContent: '', // 博客内容
            blogTitle:'', // 博客标题
            blogCategory: '', // 博客分类
            categoryData: [], // 所有分类数
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

    // 选择分类下拉菜单
    handleOptionsChange = (value) => {
        console.log(value);
        this.setState({
            blogCategory: value
        })
    }

    // 图片上传
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => this.setState({fileList})

    // 保存
    enterLoading = () => {
        if (!this.state.blogContent || !this.state.blogTitle || !this.state.blogCategory) {
            alert('必填')
            return;
        }
        this.setState({loading: true});
        const params = {
            blogContent: this.state.blogContent, // 博客内容
            title: this.state.blogTitle, // 博客标题
            categoryID: this.state.blogCategory, // 博客分类
        }
        console.log(params)
        fetch('/save-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
            })
            .then(res => res.json())
            .then(json => {
                console.log('parsed json', json)
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.setState({ loading: false });
            })
        }

    // 博客输入框
    handleContentChange = (e) => {
        this.setState({
            blogContent: e.target.value.trim(),
        })
    }

    // 博客标题
    handleTitleChange = (e) => {
        this.setState({
            blogTitle: e.target.value.trim(),
        })
    }

    render() {
        // 选择分类下拉菜单
        const OptionItems = this.state.categoryData.map(item => {
            return (
                <Option key={item._id} value={item._id}>{item.categoryName}</Option>
            )
        })
        // 图片上传
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <div className="edit-blog-body">
                <div className="example-input edit-title-title">
                    <Input size="large" placeholder="请输入文章标题" onChange={this.handleTitleChange}/>
                </div>
                <div className="edit-options">
                    <div className="selected-options">
                        <Select
                            showSearch={true}
                            style={{ width: 100 }}
                            placeholder="选择分类"
                            optionFilterProp="children"
                            onChange={this.handleOptionsChange}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {OptionItems}
                        </Select>
                    </div>
                    <div className="clearfix">
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                    </div>
                    <div className="save-btn">
                        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                            Save
                        </Button>
                    </div>
                </div>
                <div className="edit-content">
                    <div className="edit-left">
                        <textarea className="admin-edit-blog"
                                  value={this.state.blogContent}
                                  onChange={this.handleContentChange}/>
                    </div>
                    <div className="edit-right" dangerouslySetInnerHTML={{__html: marked(this.state.blogContent)}}></div>
                </div>
            </div>
        )
    }
}

export default EditBlog