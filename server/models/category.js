const config = require('../config')
const mongo = require('koa-mongo');

module.exports={
    /**
     * find blog category
     * @param ctx
     * @returns {*}
     */
    async find(ctx) {
       return await ctx.mongo.db(config.dbName).collection(config.table.category).find().toArray();
    },

    /**
     * update blog category
     * @param ctx
     * @param id
     * @param updator
     * @returns {*}
     */
    async update(ctx, id, updator){
        return await ctx.mongo.db(config.dbName).collection(config.table.category)
            .updateOne({_id: mongo.ObjectId(id)}, {$set: updator})
    },

    async delete(ctx,id) {
        return await ctx.mongo.db(config.dbName).collection(config.table.category).remove({
            _id: mongo.ObjectId(id)
        });
    }
}