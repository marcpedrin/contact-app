const express = require('express')
const data = require('../model/model')
const router = express.Router()
// const model = require('../model/model')


// route for index.ejs

router.get('/', async (req,res) =>{
    const contacts = await data.find()
    res.render('index',
    {contacts: contacts}
    )
})

router.get('/create', (req,res) => {
    res.render('create', {contact: new data()})
})

router.get('/update/:id', async (req,res) =>{
    const contact = await  data.findById(req.params.id)
    res.render('update', {contact: contact})
})





// data manuplation routes 
// router.post('/', (req,res)=>{
//     req.contact = new data()
//     req.contact.name = req.body.name
//     req.contact.contact = req.body.contact
//     req.contact.email = req.body.email

//     try{
//    req.contact.save()
//     res.redirect('/')
//     }

//     catch(err){
//         res.redirect('/create')
//         console.log(err)
//     }
    
// })


router.post('/', (req,res,next)=>{
    req.contact = new data()
    next()
},saveAndRedirect('create'))

router.put('/:id', async (req,res,next)=>{
    req.contact = await data.findById(req.params.id)
    next()
},saveAndRedirect('update'))

router.delete('/:id', async(req,res)=>{
    await data.findByIdAndDelete(req.params.id)
    res.redirect('/')
}) 







function saveAndRedirect(path){
    
    return async (req,res)=>{
        let contact = req.contact;
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.contact = req.body.contact;
        // console.log(req.body)
        try{
            contact = await contact.save();

            res.redirect(`/`)
        }

        catch (err) {
            console.log(err)
            // res.render(`index`)
            res.render(path, {contact: contact})
        } 
    }

}




module.exports = router