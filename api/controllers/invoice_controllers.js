const User=require('../models/user');
const Invoice=require('../models/invoice');

module.exports.fetchAll=async (req,res) => {
    try {
        console.log(req.params.id)
        const user=await User.findById(req.params.id);
        let allInvoices=[];
        for(let id in user.invoices){
            try {
                let currInvoice=await Invoice.findById(id);
                allInvoices.push(currInvoice);
            } catch (error) {
                console.log('Error in finding invoice',error);
                return res.status(404).json({msg: `Invoice of id: ${id} not found`,error});
            }
        }
        return res.status(200).json({allInvoices: JSON.stringify(allInvoices)});
    } catch (error) {
        console.log('Internal server error',error);
        return res.status(500).json({msg: '******Internal server error******'},error);
    }
};

module.exports.create=async (req,res) => {
    const {invoiceNumber,costumerId,amount,invoiceDate,dueDate,billTo,status}=req.body;
    try {
        let invoice=await Invoice.create({invoiceNumber,costumerId,amount,invoiceDate,dueDate,billTo,status});
        const costumer=await User.findById(costumerId);
        // invoice=await invoice.populate('')
        costumer.invoices.push(invoice);
        // await costumer.populate('invoices');
        await costumer.save();
        return res.status(200).json({msg: 'Invoice created',costumer});
    } catch (error) {
        console.log('Error in creating invoice',error);
        return res.status(500).json({msg: '******Internal server error******',error});
    }
}