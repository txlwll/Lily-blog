const mongo = require('koa-mongo');
const config = require('../config');

module.exports = {
    /**
     * find blog
     * @param ctx
     * @returns {blogs} 查询满足条件的博客
     */
    async find(ctx){
        return await ctx.mongo.db(config.dbName).collection(config.table.blog).find().toArray();
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

}