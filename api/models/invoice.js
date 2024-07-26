const mongoose=require('mongoose');

const invoiceSchema=new mongoose.Schema({
    invoice_number: {type: Number, required: true},
    costumer_id: {type: mongoose.Schema.ObjectId, required: true},
    amount: {type: Number, required: true},
    due_date: {type: Date, required: true},
    status: {type: String, enum: ['paid','unpaid'], default: 'unpaid'}
},{timestamps: true});

const Invoices=mongoose.model('Invoice',invoiceSchema);

module.exports=Invoices;