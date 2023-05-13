const { mongoose } = require('mongoose')

const twitch = new mongoose.Schema({
	Streamers: { type: "Array", default: [] },
	HasSent: { type: "Array", default: [] }
})

const ShopItems = mongoose.model('Twitch', twitch)

module.exports = ShopItems