const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');

// register "eq" helper so edit.hbs can compare values
hbs.registerHelper('eq', function (a, b) {
    return a == b;
});

router.get('/', async function (_req, res, next) {
    try {
        const productList = await ProductModel.find({}).populate('category');
        res.render('product/index', { productList: productList, title: 'Products' });
    }
    catch (error) {
        next(error);
    }
});

router.get('/sort/asc', async (req, res) => {
    var productList = await ProductModel.find().sort({ name: 1 }).populate('category');
    res.render('product/index', { productList: productList, title: 'Products' });
})

router.get('/sort/desc', async (req, res) => {
    var productList = await ProductModel.find().sort({ name: -1 }).populate('category');
    res.render('product/index', { productList: productList, title: 'Products' });
})

router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        const categories = await CategoryModel.find().lean();
        res.render('product/edit', { product, categories: categories });
    } catch (error) {
        next(error);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await ProductModel.findByIdAndUpdate(id, data);
        res.redirect('/product');
    } catch (error) {
        next(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        res.redirect('/product');
    }
    catch (error) {
        next(error);
    }
});

router.get('/add', async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({});
        res.render('product/add', { categories: categories });
    }
    catch (error) {
        next(error);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        const product = req.body;
        await ProductModel.create(product);
        res.redirect('/product');
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            let InputErrors = {};
            for (let field in error.errors) {
                InputErrors[field] = error.errors[field].message;
            }
            const categories = await CategoryModel.find({});
            res.render('product/add', { InputErrors: InputErrors, categories: categories, product: req.body });
        }
    }
});

router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var productList = await ProductModel.find({ name: new RegExp(keyword, "i") }).populate('category');
    res.render('product/index', { productList: productList });

});

module.exports = router;