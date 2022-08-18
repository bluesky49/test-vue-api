const fs = require("fs")
const data = require("../../data.json")
const Client = require("../models/clients.model")

/** 
 * @swagger 
 * /clients: 
 *   get: 
 *     description: Get Clients
 *     responses:  
 *       200: 
 *         description: Get Clients
 *   
 */  
const getClients = async (req, res) => {
    const clients = await Client.find({})
    return res.status(200).json({
        message: "success",
        data: clients
    }) 
}

/** 
 * @swagger 
 * /clients: 
 *   post: 
 *     description: Create a Client 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *        data:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              required: true
 *            email:
 *              required: true 
 *              type: string 
 *            phone:
 *              required: true 
 *              type: string 
 *            providers:
 *              type: array
 *              items: 
 *                type: object
 *                properties: 
 *                  id: 
 *                    type: integer
 *     responses:  
 *       200: 
 *         description: Created  
 *   
 */  
const addClients = async (req, res) => {
    const clients = await Client.find({email: req.body.data.email})
    if (clients.length) {
        return res.status(200).json({message: "duplicated client"})
    }
    const client = new Client(req.body.data)
    const data = await client.save()
    return res.status(201).json({
        message: "success",
        data
    }) 
}

/** 
 * @swagger 
 * /clients: 
 *   put: 
 *     description: update a Client 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *               required: true
 *            name:
 *              type: string
 *              required: true
 *            email:
 *              required: true 
 *              type: string 
 *            phone:
 *              required: true 
 *              type: string 
 *            providers:
 *              type: array
 *              items: 
 *                type: object
 *                properties: 
 *                  id: 
 *                    type: integer
 *     responses:  
 *       200: 
 *         description: updated client  
 *   
 */  
const updateClients = async (req, res) => {
    await Client.findOneAndUpdate({_id: req.body.data._id}, req.body.data)
    const data = await Client.findOne({_id: req.body.data._id})
    return res.status(200).json({
        message: "success",
        data
    }) 
}

/** 
 * @swagger 
 * /clients: 
 *   delete: 
 *     description: delete a Client 
 *     parameters: 
 *     - name: data
 *       in: body
 *       required: true
 *       type: object
 *       properties: 
 *        data: 
 *          type: integer
 *          required: true
 *     responses:  
 *       200: 
 *         description: deleted  
 *   
 */  
const deleteClients = async (req, res) => {
    await Client.findOneAndDelete({_id: req.body.data})
    return res.status(200).json({
        message: "success",
    }) 
}
module.exports = { getClients, addClients, updateClients, deleteClients }