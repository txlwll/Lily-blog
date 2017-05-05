import React from 'react'
import './css/login.css'

class Login extends React.Component {
    render() {
        return (
            <div className="login-box">
                <div className="login">
                    <h3 className="login-title">管理员登陆</h3>
                    <input type="text" className="login-wrap" placeholder="请输入用户名"/>
                    <input type="password" className="login-wrap" placeholder="请输入密码"/>
                    <button className="login-wrap login-btn">登&nbsp;&nbsp;&nbsp;录</button>
                </div>
            </div>
        )
    }
}

export default Login