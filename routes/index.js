const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log("router loaded");
router.get('/',homeController.home);
router.get('/careers',homeController.careers);
router.get('/contacts',homeController.contacts);

module.exports=router;
