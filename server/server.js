const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const send = require('koa-send');
const path = require('path');
const serve = require('koa-static');
const mongo = require('koa-mongo');
const bodyParser = require('koa-bodyparser');
const config = require('./config')

// 中间件
app.use(mongo(
    {
        host: 'localhost',
        port: 27017,
        db: 'blog',
        max: 100,
        min: 1
    }
));
app.use(serve('./build'));
app.use(bodyParser());

// 路由
const blogController = require('./controller/blogController')
const categoryController = require('./controller/categoryController')
router
    // 博客分类
    .get('/category', categoryController.getCategoryList)

    // 关于博客
    .get('/blog-list', blogController.getBlogs)  // 获取博客列表
    .get('/blog/:id', blogController.getBlogById) // 获取任一条博客
    .post('/save-blog', blogController.saveBlog) // 保存博客
    .del('/delete-blog/:id', blogController.deleteBlog) // 删除任一条博客
    .put('/update-blog/:id',blogController.updateBlog)  // 博客更新
    // 页面路由请求
    .get(['/', '/blog'], async ctx => {
        await send(ctx, 'build/index.html', {title: 'aaa'});
    });

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, function () {
    console.log('server start at 4000')
});