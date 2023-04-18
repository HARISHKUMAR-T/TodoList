const express=require('express')
const router=express.Router()

const {
    getCategories,createCategory,updateCategory,deleteCategory,
    getTasks,createTask,updateTask,deleteTask
}=require('../controllers/category')

//routes
router.route('').get(getCategories).post(createCategory)
router.route('/:categoryId').patch(updateCategory).delete(deleteCategory)
router.route('/:categoryId/tasks').get(getTasks).post(createTask)
router.route('/:categoryId/tasks/:taskId').patch(updateTask).delete(deleteTask)

module.exports=router