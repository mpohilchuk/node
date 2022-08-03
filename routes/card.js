const { Router } = require('express')
const router = Router()

const Card = require('../models/card')
const Cat = require('../models/cat')


router.post('/add', async(req, res) => {
    const cat = await Cat.getById(req.body.id)
    await Card.add(cat)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

router.get('/', async(req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: "Корзина",
        isCard: true,
        cats: card.cat,
        price: card.price
    })
})

module.exports = router