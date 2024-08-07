const mongoose=require('mongoose');

const invoiceSchema=new mongoose.Schema({
    invoiceNumber: {type: Number, required: true},
    costumerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: {type: Number, required: true},
    invoiceDate: {type: Date, required: true},
    dueDate: {type: Date, required: true},
    billTo: {type: String, required: true},
    status: {type: String, enum: ['paid','unpaid'], default: 'unpaid'}
},{timestamps: true});

const Invoices=mongoose.model('Invoice',invoiceSchema);

module.exports=Invoices;