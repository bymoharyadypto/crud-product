const { User, Product } = require('../models')
const { Op, json } = require('sequelize')
const { comparePassword } = require('../helpers/bcrypt-helpers')
const { sign } = require('../helpers/jwt-helpers')

class IndexController {

    static async register(req, res, next) {
        const { first_name, last_name, email, password } = req.body
        try {
            const newUser = await User.create({ first_name, last_name, email, password })
            res.status(201).json({ id: newUser.id, email: newUser.email })
        } catch (error) {
            next(error)
        }
    }

    static async signin(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ attributes: { email, password }, where: { email } })
            if (!user) throw ({ name: 'EmailorPasswordNotFound' })
            else if (!user.length === undefined) throw ({ name: 'EmailorPasswordNotFound' })
            else if (!comparePassword(password, user.password)) throw ({ name: 'InvalidPassword' })
            const access_token = sign({ id: user.id, email })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static getPagingData(dataProduct, page, limit) {
        const { count: totalItems, rows: products } = dataProduct;
        const currentPage = page ? + page : 1;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, products, totalPages, currentPage };
    };

    static getPagination(page) {
        const limit = 4
        if (page === 1) {
            let offset = 0
            return { limit, offset }
        } else {
            let offset = page ? page * limit - 4 : 0
            return { limit, offset }
        }
    }

    static async getProducts(req, res, next) {
        const nama_produk = req.query.nama_produk || ''
        const { page } = req.query
        const { limit, offset } = IndexController.getPagination(page)
        try {
            const queryPost = await Product.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            nama_produk: { [Op.iLike]: `%${nama_produk}%` }
                        }
                    ]
                }, offset, limit
            })
            const responseData = IndexController.getPagingData(queryPost, page, limit)
            res.status(200).json(responseData)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async creteProduct(req, res, next) {
        const { kode_produk, nama_produk, qty, image_produk } = req.body
        try {
            const createProduct = await Product.create({ kode_produk, nama_produk, qty, image_produk })
            res.status(201).json(createProduct)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async updateProduct(req, res, next) {
        const { kode_produk, nama_produk, qty, image_produk } = req.body
        try {
            const productById = await Product.findByPk(req.params.id, { where: { id: req.params.id } })
            if (!productById) throw ({ name: 'DataNotFound' })
            console.log(productById);
            await Product.update({ kode_produk, nama_produk, qty, image_produk }, { where: { id: req.params.id}, returning: true})
            res.status(200).json({message: 'product has been updated'})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const productById = await Product.findByPk(req.params.id, { where: { id: req.params.id } })
            if (!productById) throw ({ name: 'DataNotFound' })
            await Product.destroy({ attributes: { id: req.params.id }, where: { id: req.params.id }, returning: true })
            res.status(200).json({ message: `kode produk ${productById.kode_produk} has been deleted` })
        } catch (error) {
            next(error)
            console.log(error);
        }
    }
}

module.exports = IndexController