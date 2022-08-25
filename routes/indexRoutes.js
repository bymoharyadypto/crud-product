const router = require('express').Router()
const IndexController = require('../controllers/indexController')
const authenticationMiddleware = require('../middlewares/authentication')
const errorHandlerMiddleware = require('../middlewares/errorHandler')

router.post('/register', IndexController.register)
router.post('/sign-in', IndexController.signin)

router.use(authenticationMiddleware)
router.get('/products', IndexController.getProducts)
router.post('/product', IndexController.creteProduct)
router.put('/product/:id', IndexController.updateProduct)
router.delete('/product/:id', IndexController.deleteProduct)

router.use(errorHandlerMiddleware)

module.exports = router