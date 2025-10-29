var router = require('express').Router();
var CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
const { checkLoginSession, checkMultipleSessions, checkSingleSession } = require('../middleware/auth');


router.get('/', checkLoginSession, checkMultipleSessions(['admin', 'user']), async function (req, res, next) {
    try {
        var categoryList = await CategoryModel.find({});
        console.log("Hello" + categoryList);
        res.render('category/index', { categoryList, title: 'Categories' });

    } catch (error) {
        // forward the error to Express error handler
        next(error);
    }
});

router.get('/delete/:id', checkLoginSession, checkSingleSession("admin"), async (req, res) => {
    var id = req.params.id;
    await CategoryModel.findByIdAndDelete(id);
    res.redirect('/category')
})

router.get('/edit/:id', checkLoginSession, checkSingleSession("admin"), async (req, res) => {
    var id = req.params.id;
    var category = await CategoryModel.findById(id);
    res.render('category/edit', { category });
})

router.post('/edit/:id', checkLoginSession, checkSingleSession("admin"), async (req, res) => {
    var id = req.params.id;
    var data = req.body;
    await CategoryModel.findByIdAndUpdate(id, data);
    res.redirect('/category')
})

router.get('/add', checkLoginSession, checkSingleSession("admin"), (req, res) => {
    res.render('category/add');
});

router.post('/add', checkLoginSession, checkSingleSession("admin"), async (req, res) => {
    var category = req.body;
    await CategoryModel.create(category);
    res.redirect('/category')
});

router.get('/detail/:id', checkLoginSession, checkMultipleSessions(['admin', 'user']), async (req, res) => {
    const id = req.params.id;
    var productList = await ProductModel.find({ category: id });
    res.render('product/index', { productList })
})


module.exports = router;