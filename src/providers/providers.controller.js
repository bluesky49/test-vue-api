const fs = require('fs');
const Provider = require("../models/provider.model")
const data = require("../../data.json")

/** 
 * @swagger 
 * /providers: 
 *   get: 
 *     description: Get Providers
 *     responses:  
 *       200: 
 *         description: Get Providers
 *   
 */  
const getProviders = async (req, res) => {
    const providers = await Provider.find({})
    return res.status(200).json({
        message: "success",
        data: providers
    }) 
}

/** 
 * @swagger 
 * /providers: 
 *   post: 
 *     description: create a provider 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *         data: 
 *           type: string
 *           required: true    
 *     responses:  
 *       200: 
 *         description: Created  
 *   
 */  
const addProvider = async (req, res) => {
    const exists = await Provider.find({name: req.body.data})
    if (exists.length) {
        return res.status(409).json({
            message: "duplicate provider"
        })
    }
    const provider = new Provider({name: req.body.data})
    const data = await provider.save()

    return res.status(201).json({
        message: "success",
        data
    })
}

/** 
 * @swagger 
 * /providers: 
 *   delete: 
 *     description: delete a provider 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *         data: 
 *           type: integer
 *           required: true    
 *     responses:  
 *       200: 
 *         description: Deleted  
 *   
 */  
const deleteProvider = async (req, res) => {
    await Provider.findOneAndDelete({_id: req.body.data})
    return res.status(200).json({
        message: "success",
    })
}
/** 
 * @swagger 
 * /providers: 
 *   put: 
 *     description: delete a provider 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *         data: 
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             id:
 *               type: integer
 *               required: true
 *     responses:  
 *       200: 
 *         description: updated  
 *   
 */  
const updateProvider = (req, res) => {
    data.providers = data.providers.map(i => {
        if (i.id === req.body.data.id) {
            return {id: i.id, name: req.body.data.name}
        } else {
            return i
        }
    })
    fs.writeFileSync("data.json", JSON.stringify(data), 'utf8')
    return res.status(200).json({
        message: "success"
    })
}
module.exports = { getProviders, addProvider, deleteProvider, updateProvider }