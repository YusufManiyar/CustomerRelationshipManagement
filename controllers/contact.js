const contactManager = require('../provider/contact')

module.exports = {

    create: async (req, res) => {
       try { 
        console.log(req.body)
            const newContact = await contactManager.createContact({ ...req.body })
            res.status(201).json(newContact)
        } catch(error){
            console.log("🚀 ~ create: ~ error:", error)
            res.status(400).json({ msg: 'contact not found'})
        }
    },

    getById: async (req, res) => {
        try{
            const getContact = await contactManager.getContact(req.body)
            res.status(200).json(getContact) 
        } catch(error){
            console.log("🚀 ~ getById error:", error)
            res.status(400).json({ msg: 'contact not found'})
        }
    },

    update: async (req, res) => {
        try{
            const updateContact = await contactManager.updateContact({ ...req.body })
            res.status(200).json(updateContact) 
        } catch(error){
            console.log("🚀 ~ update: ~ error:", error)
            res.status(400).json({ msg: 'contact not found'})
        }
    },
    
    delete: async (req, res) => {
        try{
            await contactManager.deleteContact({ ...req.body })
            res.status(200).json({status: 'ok'})
        } catch(error){
            console.log("🚀 ~ delete: ~ error:", error)
            res.status(400).json({ msg: 'contact not found'})
        }
    }

};
