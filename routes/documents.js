const router =require('express').Router()
const documentMiddleware=require('../middleware/document')
const {
  create,
  read,
  update,
  remove
} =require('../controllers/users')

router.get('/:id?',read);
router.post('/',[documentMiddleware],create);
router.put('/:id',[documentMiddleware],update);
router.delete('/:id',remove);

module.exports=router