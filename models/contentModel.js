const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema

const contentSchmea = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        default: '/'
    },
    menuId: {
        type: mongoose.Types.ObjectId,
        ref: 'Menu',
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
        default: null,
    }, 
    isActive: {
        type: Boolean,
        default: 1,
    }
})

contentSchmea.pre('save', function (next) {
    if (this.slug === '') {
        this.slug = slugify(this.title)
    }

    next()
})

const Content = mongoose.model('Content', contentSchmea)

module.exports= Content