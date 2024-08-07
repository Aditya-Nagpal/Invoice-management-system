const router=require('express').Router();
const InvoiceController=require('../controllers/invoice_controllers');
const middleware=require('../config/middleware');

router.get('/fetch-all/:id',InvoiceController.fetchAll);
router.post('/create',middleware,InvoiceController.create)

module.exports=router;