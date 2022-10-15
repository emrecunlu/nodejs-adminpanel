const menuModel = require('../../models/menuModel')
const contentModel = require('../../models/contentModel');

const contentPage = async (req, res) => {
    
    const messages = await req.consumeFlash('message');

    res.render('admin/pageContents', { messages})
}

const contentAddPage = async (req, res) => {
    const messages = await req.consumeFlash('message');

    const menus = await menuModel.find({})

    res.render('admin/addContent', { messages, menus})
}

const contentAdd = async (req, res) => {
    const Content = new contentModel({
        image: req.file?.path ?? null,
        ...req.body 
    })

    Content.save()
    .then(result => {
        req.flash('message', {
            type: 'success',
            msg: 'Sayfa başarıyla kaydedildi!'
        })

        res.redirect('/admin/page-contents/add')
    })
    .catch(err => {
        req.flash('message', {
            type: 'error',
            msg: 'Sayfa kaydedilirken hata oluştu!'
        })

        res.redirect('/admin/page-contents/add')
    })
}

module.exports = {
    contentPage,
    contentAddPage,
    contentAdd
}