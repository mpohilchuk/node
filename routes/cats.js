const { Router } = require('express')
const Cat = require('../models/cat')
const router = Router()

router.get('/', async (req, res) => {
    const cats = await Cat.getAll()
    res.status(200)
    res.render('cats', {
        title: 'Кошки',
        isCats: true,
        cats: cats
    })
})


router.get('/:id', async (req, res) => {
    const cat = await Cat.getById(req.params.id)
    res.render('cat',{
        layout: 'empty',
        title: `Кошка ${cat.title}`,
        cat
    })
})

router.get('/:id/edit', async(req, res) => {
    if(!req.query.allow){
        return res.redirect('/')
    }
    const cat = await Cat.getById(req.params.id)
    res.render('cat-edit',{
        title: `Редактировать кошку ${cat.title}`,
        cat
    })
})

router.post('/edit', async(req, res) => {
    await Cat.update(req.body)
    res.redirect('/cats')
})

module.exports = router