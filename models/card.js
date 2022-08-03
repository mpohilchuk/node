const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card{
    static async add(cat){
        const card = await Card.fetch()

        const idx = card.cat.findIndex(c => c.id === cat.id)
        const candidate = card.cat[idx]

        if(candidate){
            candidate.count++
            card.cat[idx] = candidate
        }else{
            cat.count = 1
            card.cat.push(cat)
        }

        card.price += +cat.price

        return new Promise(
            (resolve, reject) => {
                fs.writeFile(p, JSON.stringify(card), err => {
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                })
            }
        )
    }

    static async fetch(){
        return new Promise(
            (resolve, reject) => {
                fs.readFile(p, 'utf-8', (err, content) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
                })
            }
        )
    }

    static async remove(id){
        const card = await Card.fetch()

        const idx = card.cat.findIndex(c => c.id === id)
        const cat = card.cat[idx]

        if(cat.count === 1){    
            card.cat = card.cat.filter(c => c.id !== id)
        }else{
            card.cat[idx].count-- 
        }

        card.price -= cat.price

        return new Promise(
            (resolve, reject) => {
                fs.writeFile(p, JSON.stringify(card), err => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(card)
                    }
                })
            }
        )
    }
}

module.exports = Card