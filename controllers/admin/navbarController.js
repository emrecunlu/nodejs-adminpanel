const mongoose = require('mongoose')
const menuModel = require('../../models/menuModel')


const index = async (req, res) => {
    const messages = await req.consumeFlash('message');
    const menus = await menuModel.find({})

    res.render('admin/menu', { menus, messages})
}

const addMenuPage = async (req, res) => {
    const messages = await req.consumeFlash('message');

    res.render('admin/addMenu', { messages})
}

const deleteMenu = async (req, res) => {
    const id = req.params.id

    if (mongoose.isValidObjectId(id)) {
        const deleteMenu = await menuModel.findOneAndDelete(id)

        if (deleteMenu.errors) {
            req.flash('message', {
                type: 'error',
                msg: 'Menü silinirken hata oluştu!'
            })

            res.redirect('/admin/navbar')
        } else {
            req.flash('message', {
                type: 'success',
                msg: 'Menü başarıyla silindi.'
            })
            
            res.redirect('/admin/navbar')
        }
    } else {
        req.flash('message', {
            type: 'error',
            msg: 'Lütfen geçerli bir id giriniz!'
        })

        res.redirect('/admin/navbar')
    }
}

const addMenu = async (req, res) => {
    const Menu = new menuModel(req.body)

    const addMenu = await Menu.save()

    if (addMenu.errors) {
        req.flash('message', {
            type: 'error',
            msg: addMenu._message
        })

        res.redirect('/admin/navbar/add-menu')
    } else {
        req.flash('message', {
            type: 'success',
            msg: 'Kayıt işlemi başarılı!'
        })

        res.redirect('/admin/navbar/add-menu')
    }
}

const updatePage = async (req, res) => {

    const id = req.params.id

    if (mongoose.isValidObjectId(id)) {
        const menu = await menuModel.findById(id) 

        if (menu.errors) {
            req.flash('message', {
                type: 'error',
                msg: menu._message
            })

            res.redirect('/admin/navbar')
        } else {
            const messages = await req.consumeFlash('message');

            res.render('admin/updateMenu', {messages, menu})
        }
    } else {    
        res.redirect('/admin/navbar')
    }
}   

const updateMenu = async (req, res) => {
    const id = req.params.id

    if (mongoose.isValidObjectId(id)) {
        const updateMenu = await menuModel.findOneAndUpdate(id, req.body)

        if (updateMenu.errors) {
            req.flash('message', {
                type: 'error',
                msg: updateMenu._errors
            })

            res.redirect('/admin/navbar')
        } else {
            req.flash('message', {
                type: 'success',
                msg: 'Menü başarıyla güncellendi!'
            })

            res.redirect('/admin/navbar')
        }
    } else {
        req.flash('message', {
            type: 'error',
            msg: 'Lütfen geçerli bir id giriniz!'
        })

        res.redirect('/admin/navbar')
    }
}

const subMenuPage = async (req, res) => {
    
}

module.exports = {
    index,
    addMenuPage,
    addMenu,
    deleteMenu,
    updatePage,
    updateMenu
}