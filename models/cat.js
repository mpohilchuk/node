const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path');

class Cat{
    constructor(title, price, img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    toJson(){
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save(){
        const cats = await Cat.getAll()
        cats.push(this.toJson())

        return new Promise(
            (resolve, reject) => {
                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'cats.json'),
                    JSON.stringify(cats),
                    (err) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    }
                )
            }
        )
        
    }

    static getAll(){
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cats.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
    
    
                }
            )
        })
    }

    static async getById(id){
        const cats = await Cat.getAll()
        return cats.find(c => c.id === id)
    }

    static async update(cat){
        const cats = await Cat.getAll()
        const idx = cats.findIndex(c => c.id === cat.id)
        
        cats[idx] = cat

        return new Promise(
            (resolve, reject) => {
                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'cats.json'),
                    JSON.stringify(cats),
                    (err) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    }
                )
            }
        )
    }
}

module.exports = Cat