const config = require('../config')

module.exports={
    /**
     * find blog category
     * @param ctx
     * @returns {*}
     */
    async find(ctx) {
       return await ctx.mongo.db(config.dbName).collection(config.table.category).find().toArray();
    }
}