const express = require('express')
const app = express()
const mainController = require('../controllers/admin/mainController')
const navbarController = require('../controllers/admin/navbarController')
const contentController = require('../controllers/admin/contentController')

const router = express.Router()

router.get('/', mainController.index)

router.get('/navbar', navbarController.index)
router.get('/navbar/add-menu', navbarController.addMenuPage)
router.get('/navbar/delete/:id', navbarController.deleteMenu)
router.get('/navbar/update/:id', navbarController.updatePage)
router.post('/navbar/update/:id', navbarController.updateMenu)
router.post('/navbar/add-menu', navbarController.addMenu)

router.get('/page-contents', contentController.contentPage)
router.get('/page-contents/add', contentController.contentAddPage)
router.post('/page-contents/add', contentController.contentAdd)

module.exports = router