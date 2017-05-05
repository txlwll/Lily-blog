import React from 'react'
import './css/blogContent.css'

class BlogContent extends React.Component {
    render() {
        return (
            <div className="article-content">
                <div className="title">
                    <h3 className="blog-title">webpack + react + react-router 如何实现懒加载</h3>
                    <p className="create-date">2015-01-03</p>
                </div>
                <div className="bottom-wrap top-wrap">
                    <div className="top-wrap-left">
                        <div className="wrap">
                            <span className="wrap-icon zan"></span>
                            <p><span>0 </span>赞</p>
                        </div>
                        <div className="wrap">
                            <span className="wrap-icon pinglun"></span>
                            <p><span>0 </span>评论</p>
                        </div>
                        <div className="wrap">
                            <span className="wrap-icon scan"></span>
                            <p><span>0 </span>浏览</p>
                        </div>
                    </div>
                    <div className="top-wrap-right">
                        <p className="up-article">上一篇</p>
                        <span className="separator"> | </span>
                        <p className="next-article">下一篇: 醇等辅助预防老年疾</p>
                    </div>
                </div>
                <div className="content">
                    1、抗衰老：西红柿中有抗衰老和降低胆固醇等辅助预防老年疾病的元素，适合常吃，我国是世界上肝炎常发的大国，西红柿有一定保肝护肝的作用。

                    2、维生素C丰富：餐桌上的美味，迷人的外形，鲜嫩的色泽，很多人都喜欢食用，其实西红柿不但味道鲜美，还具有一定的“药效”。西红柿中含维生素C，可以预防感冒，而大量含有的番茄红素，是一种让番茄变红的天然色素，有抗氧化损伤和软化血管的作用。

                    3、防癌：西红柿中的番茄红素，具有很高的抗氧化作用，它能够保护细胞不受伤害，也能修补已受损的细胞，抑制和清除人体内的自由基。保护心血管系统，降低心脏病、高血压的发病率，对防癌、抗癌有一定效果。

                    4、美白：想保持皮肤的白皙么？当然少不了常吃西红柿、它含有的维生素P是细胞正常代谢不可缺少的物质，可以使皮肤的色素、暗斑消退，防止色素沉着。
                </div>
                <div className="comment-box">
                    <h3 className="comment-title">评论：</h3>
                    <textarea className="comment-input" name="" id=""></textarea>
                    <div className="btn-box">
                        <button className="submit-comment">发表评论</button>
                    </div>
                </div>
                <div className="comment-list">
                    评论列表 :
                </div>
            </div>
        )
    }
}


export default BlogContent