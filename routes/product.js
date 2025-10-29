const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
var multer = require('multer');

const prefix = Date.now();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        let filename = prefix + "_" + file.originalname;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const { checkLoginSession, checkSingleSession, checkMultipleSessions } = require('../middleware/auth');

// register "eq" helper so edit.hbs can compare values
hbs.registerHelper('eq', function (a, b) {
    return a == b;
});

router.get('/', checkLoginSession, async function (_req, res, next) {
    try {
        const productList = await ProductModel.find({}).populate('category');
        res.status(200);
        res.render('product/index', { productList: productList, title: 'Products' });
    }
    catch (error) {
        next(error);
    }
});

router.get('/sort/asc', checkLoginSession, async (req, res) => {
    var productList = await ProductModel.find().sort({ name: 1 }).populate('category');
    res.status(200);
    res.render('product/index', { productList: productList, title: 'Products' });
})

router.get('/sort/desc', checkLoginSession, async (req, res) => {
    var productList = await ProductModel.find().sort({ name: -1 }).populate('category');
    res.status(200);
    res.render('product/index', { productList: productList, title: 'Products' });
})

router.get('/edit/:id', checkLoginSession, async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        const categories = await CategoryModel.find().lean();
        res.status(200);
        res.render('product/edit', { product, categories: categories });
    } catch (error) {
        next(error);
    }
});

router.post('/edit/:id', checkLoginSession, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await ProductModel.findByIdAndUpdate(id, data);
        res.status(201).json("Updated successfully");
        res.redirect('/product');
    } catch (error) {
        next(error);
    }
});

router.get('/delete/:id', checkLoginSession, async (req, res, next) => {
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        res.redirect('/product');
    }
    catch (error) {
        next(error);
    }
});

router.get('/add', checkLoginSession, checkSingleSession("admin"), async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({});
        res.render('product/add', { categories: categories });
    }
    catch (error) {
        next(error);
    }
});

router.post('/add', checkLoginSession, checkSingleSession("admin"), upload.single('image'), async (req, res, next) => {
    try {
        const product = req.body;
        product.image = prefix + "_" + req.file.originalname;
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

router.post('/search', checkLoginSession, checkMultipleSessions("admin", "user"), async (req, res) => {
    var keyword = req.body.keyword;
    var productList = await ProductModel.find({ name: new RegExp(keyword, "i") }).populate('category');
    res.render('product/index', { productList: productList });

});

module.exports = router;