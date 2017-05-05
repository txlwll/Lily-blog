const Category = require('../models/category')

module.exports = {
    async getCategoryList(ctx){
        let categoryData = await Category.find(ctx);
        categoryData = categoryData.map(item => Object.assign({}, item, {acticleCount: 0}))
        ctx.body = categoryData;
    }
}