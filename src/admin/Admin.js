import React from 'react'
import {
    Route,
    Link,
} from 'react-router-dom'
import BlogManage from './BlogManage'
import EditBlog from './EditBlog'
import './css/admin.css'

class Admin extends React.Component {
    render() {
        const {match} = this.props;
        return (
            <div className="admin-body">
                <div className="admin-left">
                    <Link to={`${match.url}`}>
                        <div className="admin-left-wrap">
                            <span className="admin-left-icon manage-icon"></span>
                            <p>博客管理</p>
                        </div>
                    </Link>
                    <div className="admin-left-wrap">
                        <span className="admin-left-icon own-icon"></span>
                        <p>站点管理</p>
                    </div>
                    <div className="empty"></div>
                    <div className="admin-left-wrap bottom">
                        <span className="admin-left-icon exit-icon"></span>
                        <p>退出登录</p>
                    </div>
                </div>
                <div className="admin-right">
                    <Route exact path={`${match.url}`} component={BlogManage}/>
                    <Route path={`${match.url}/add_blog`} component={EditBlog}/>
                    <Route path={`${match.url}/edit_blog/:id`} component={EditBlog}/>
                </div>
            </div>
        )
    }
}

export default Admin