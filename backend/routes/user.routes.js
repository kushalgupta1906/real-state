import express from 'express'
import { updateUser,getUserListings,getUser } from '../controllers/user.controller.js';
//import { deleteUser } from '../controllers/user.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { signOut } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/update/:id',verifyToken ,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser);
export default router;
