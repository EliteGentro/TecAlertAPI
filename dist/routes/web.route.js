import express from 'express';
import { addfaq, getfaqs, editfaq, deletefaq, addcontent, getcontents, getcontentstype, editcontents, deletecontents, editroleid, checkroleid } from '../controllers/web.controller.js';
const router = express.Router();
//Faqs
router.post("/addfaq", addfaq);
router.get("/getfaqs", getfaqs);
router.post("/editfaq", editfaq);
router.post("/deletefaq", deletefaq);
//contents
router.post("/addcontent", addcontent);
router.get("/getcontents", getcontents);
router.post("/getcontentstype", getcontentstype);
router.post("/editcontents", editcontents);
router.post("/deletecontents", deletecontents);
//roles
router.post("/editroleid", editroleid);
router.post("/checkroleid", checkroleid);
export default router;
