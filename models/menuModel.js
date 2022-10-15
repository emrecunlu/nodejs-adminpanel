const slugify = require('slugify')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			default: '/',
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
	}
)

menuSchema.pre('save', function (next) {
    if (this.slug === '') {
		this.slug = slugify(this.name, {
            replacement: '-',
            lower: true,
            locale: 'tr'
        })
    }

	next()
}) 

menuSchema.pre('findOneAndUpdate', function (next) {
    if (this.slug === '') {
		this.slug = slugify(this.name, {
            replacement: '-',
            lower: true,
            locale: 'tr',
        })
    }

	next()
}) 

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu