const {Router} = require("express")
const {getTodo, saveTodo, updateTodo, deleteTodo, verifyToken} = require('../controllers/Todocontrollers')


const router = Router();

router.get("/",verifyToken,getTodo)
router.post("/save",verifyToken,saveTodo)
router.post("/update",verifyToken,updateTodo)
router.post("/delete",verifyToken,deleteTodo)


module.exports = router;