import { Router } from "express";
import { bookACall, sendContactInformation, subscribeByEmail } from "../../controllers/user/contactController.js";

const router = Router();

router.post("/send", sendContactInformation);
router.post("/subscribe", subscribeByEmail);
router.post("/book-a-call", bookACall);

export default router;
