const { Router } = require('express')
const Cat = require('../models/cat')
const router = Router()

router.get('/', (req, res) => {
    res.status(200)
    res.render('add', {
        title: 'Добавить кошку',
        isAdd: true,
    })
})

router.post('/', async (req, res) => {
    const cat = new Cat(req.body.title, req.body.price, req.body.img)
    await cat.save()
    res.redirect('/cats')
})

module.exports = router