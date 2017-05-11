const Blog = require('../models/blog')
const mongo = require('koa-mongo');
const moment = require('moment')

module.exports = {

    /**
     * get blog list
     * @param {ctx} Koa Context
     */
    async getBlogs(ctx) {
        let blogListData = await Blog.find(ctx)
        blogListData.forEach(item => {
            item.createDate = moment(item.createDate).format('YYYY-MM-DD')
            item.blogTopic = item.blogContent.length >= 50 ? item.blogContent.substring(0, 50) + '……' : item.blogContent
            delete item.blogContent
        })

        ctx.body = blogListData
    },

    /**
     * find one blog by id
     * @param ctx
     */
    async getBlogById(ctx) {
        let result = await Blog.findOneBlog(ctx, ctx.params.id)
        console.log(result)
        ctx.body = result;
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

    /**
     * delete blog
     * @param ctx
     */
    async deleteBlog(ctx) {
        const result = await Blog.delete(ctx, ctx.params.id)
        console.log(result)
        ctx.body = result;
    },

    /**
     * update blog
     * @param ctx
     */
    async updateBlog(ctx) {
        const updateBlog = Object.assign({}, ctx.request.body, {
            updateDate: Date.now(),
        })
        delete updateBlog._id;
        updateBlog.categoryID = mongo.ObjectId(updateBlog.categoryID);
        let result = await Blog.update(ctx, ctx.params.id, updateBlog);
        ctx.body = result;
    }
}