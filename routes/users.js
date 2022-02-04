const router =require('express').Router()
const userMiddelware=require('../middleware/user')
const {
  create,
  read,
  update,
  remove
} =require('../controllers/users')

router.get('/:id?',read);
router.post('/',[userMiddelware],create);
router.put('/:id',[userMiddelware],update);
router.delete('/:id',remove);

module.exports=router