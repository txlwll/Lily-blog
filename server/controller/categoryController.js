const Category = require('../models/category')

module.exports = {
    /**
     * get category list
     * @param ctx
     */
    async getCategoryList(ctx){
        let categoryData = await Category.find(ctx);
        categoryData = categoryData.map(item => Object.assign({}, item, {acticleCount: 0}))
        ctx.body = categoryData;
    },

    /**
     * update category
     * @param ctx
     */
    async updateCategory(ctx) {
        const updateCategory = {categoryName: ctx.request.body.categoryName}
        let result = await Category.update(ctx, ctx.params.id, updateCategory);
        ctx.body = result;
    },

    /**
     * delete category
     * @param ctx
     */
    async deleteCategory(ctx) {
        const result = await Category.delete(ctx, ctx.params.id)
        console.log(result)
        ctx.body = result;
    }
}