const router=require('express').Router();
const InvoiceController=require('../controllers/invoice_controllers');

router.get('/fetch-all/:id',InvoiceController.fetchAll);

module.exports=router;