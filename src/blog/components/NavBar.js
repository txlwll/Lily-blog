import React from 'react'
import {
    Link
} from 'react-router-dom'
import './css/navBar.css'

class NavBar extends React.Component {
    render() {
        return(
            <div className="navBarBox">
                <div className="navBar">
                    <div className="nav-left">
                        <div className="nav-item">
                            <span className="nav-icon avatar"></span>
                            <p className="nav-text">小丸子</p>
                        </div>
                        <Link to={'/'}>
                            <div className="nav-item">
                                <span className="nav-icon home-page"></span>
                                <p className="nav-text">首页</p>
                            </div>
                        </Link>
                        <Link to={'/blog'}>
                            <div className="nav-item">
                                <span className="nav-icon blog-icon"></span>
                                <p className="nav-text">博客</p>
                            </div>
                        </Link>
                        <div className="nav-item">
                            <span className="nav-icon about"></span>
                            <p className="nav-text">关于</p>
                        </div>
                    </div>
                    <div className="nav-right">
                        <input className="search-input" type="text" placeholder="请输入关键字"/>
                        <p className="search-text">搜索</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default NavBar