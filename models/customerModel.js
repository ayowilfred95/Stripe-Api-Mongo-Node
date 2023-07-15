const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    email: { 
    type: String, 
    required: true
 },
  product: { 
    type: String, required: true 
},
subscriptionId :{
    type:String
},
})



module.exports = mongoose.model('Customer', customerSchema)
