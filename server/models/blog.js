const mongo = require('koa-mongo');
const config = require('../config');

module.exports = {
    /**
     * find blog
     * @param ctx
     * @returns {blogs} 查询满足条件的博客
     */
    async find(ctx, filter){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog).find(filter).toArray();
    },

    /**
     * find one blog by id
     * @param ctx
     * @param id
     * @returns {*}
     */
    async findOneBlog(ctx, id) {
        return await ctx.mongo.db(config.dbName).collection(config.table.blog).findOne({
            _id: mongo.ObjectId(id)
        });
    },

    /**
     * add blog
     * @param ctx
     * @param newBlog
     * @returns {blog} 新增博客
     */
    async insert(ctx, newBlog){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog).insert(newBlog);
    },

    /**
     * delete blog
     * @param ctx
     * @param id
     * @returns {ops}
     */
    async delete(ctx, id){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog).remove({
            _id: mongo.ObjectId(id)
        });
    },

    /**
     * 更新博客
     * @param ctx
     * @param id
     * @param updator
     * @returns {*}
     */
    async update(ctx, id, updator){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog)
            .updateOne({_id: mongo.ObjectId(id)}, {$set: updator})
    },

    async getBlogsByCategoryId(ctx, categoryID){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog)
            .find({categoryID: mongo.ObjectId(categoryID)}).toArray()
    }
}