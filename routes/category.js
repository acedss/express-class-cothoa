var router = require('express').Router();
var CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');

router.get('/', async function (req, res, next) {
    try {
        var categoryList = await CategoryModel.find({});
        console.log("Hello" + categoryList);
        res.render('category/index', { categoryList, title: 'Categories' });

    } catch (error) {
        // forward the error to Express error handler
        next(error);
    }
});

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await CategoryModel.findByIdAndDelete(id);
    res.redirect('/category')
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var category = await CategoryModel.findById(id);
    res.render('category/edit', { category });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var data = req.body;
    await CategoryModel.findByIdAndUpdate(id, data);
    res.redirect('/category')
})

router.get('/add', (req, res) => {
    res.render('category/add');
});

router.post('/add', async (req, res) => {
    var category = req.body;
    await CategoryModel.create(category);
    res.redirect('/category')
});

router.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    var productList = await ProductModel.find({ category: id });
    res.render('product/index', { productList })
})


module.exports = router;