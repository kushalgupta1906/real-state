import express from 'express'
import {signup,signin, google,signOut, verifyemail} from '../controllers/auth.controller.js'
import { upload } from '../middlewares/multer.middleware.js';
import { uploadPhoto } from '../controllers/auth.controller.js';
const router=express.Router();
//router.route("/signup").post(upload.single("avatar"),signup)
router.post("/signup",signup);
router.post("/verifyemail",verifyemail)
router.post("/signin",signin)
router.post('/google',google);
router.get('/signout',signOut);
router.route('/upload').post(upload.single("img"),uploadPhoto);
export default router;