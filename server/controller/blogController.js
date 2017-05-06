const Blog = require('../models/blog')
const mongo = require('koa-mongo');

module.exports = {

    /**
     * get blog list
     * @param {ctx} Koa Context
     */
    async getBlogs(ctx) {
        let blogListData = await Blog.find(ctx)
        blogListData.forEach(item => {
            item.blogTopic = item.blogContent.length >= 50 ? item.blogContent.substring(0, 50) + '……' : item.blogContent
            delete item.blogContent
        })

        ctx.body = blogListData
    },

    /**
     * save blog
     * @param {ctx} Koa Context
     */
    async saveBlog(ctx) {
        let newBlog = Object.assign({
            support: 0,
            comments: [],
            visits: 0,
            createDate: Date.now(),
            updateDate: Date.now(),
        }, ctx.request.body)
        newBlog.categoryID = mongo.ObjectId(newBlog.categoryID)
        let result = await Blog.insert(ctx, newBlog);
        ctx.body = result;
    },

    async deleteBlog(ctx) {
        const result = await Blog.delete(ctx, ctx.params.id)
        console.log(result)
        ctx.body = result;
    }
}