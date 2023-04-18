const {BadRequestError,NotFoundError,UnauthenticatedError}=require('../errors');
const Category=require('../models/Category')
const Task=require('../models/Task')

const getCategories=async(req,res)=>{
    const u_id=req.user.userId;
    const categories=await Category.find({createdBy:u_id}).sort('createdAt')
    res.status(200).json({categories,length:categories.length})
}
const createCategory=async(req,res)=>{
    req.body.createdBy=req.user.userId;
    console.log("create category yes");
    console.log(req.body);
    const category=await Category.create(req.body);
    console.log(222);
    res.status(200).json({category});
}
const updateCategory=async(req,res)=>{
    const {
        params:{categoryId:c_id},// categoryId is aliased as c_id 
        body:{category},
        user:{userId}
    }=req
    if (!category) {
        throw new BadRequestError("provide category name")
    }
    const updatedCategory=await Category.findOneAndUpdate(
        {_id:c_id,createdBy:userId},
        req.body,
        { runValidators: true, new: true }
    )
    if(! updateCategory){
        throw new NotFoundError(`no category with id ${c_id}`)
    }
    res.status(200).json({updatedCategory})
}
const deleteCategory=async(req,res)=>{
    const {
        params:{categoryId:c_id},
        user:{userId}
    }=req
    const deletedCategory = await Category.findByIdAndRemove(
        { _id: c_id, 
        createdBy: userId }
    )
    const deleteAllTasks=await Task.deleteMany(
        {
            relatedTo:c_id
        }
    )
    console.log("------------------");
    console.log(deletedCategory);
    console.log(deleteAllTasks);
    console.log("------------------");
    // if (!deleteCategory) {
    //     throw new NotFoundError(`no category with id ${c_id}`)
    // }
    // if (!deleteAllTasks) {
    //     throw new NotFoundError(`no task with category id ${c_id}`)
    // }
    res.status(200).json("Deleted category")
}
const getTasks=async(req,res)=>{
    const c_id=req.params.categoryId
    const tasks=await Task.find({relatedTo:c_id});
    res.status(200).json({tasks})
}
const createTask=async(req,res)=>{
    console.log("yess");
    const data={
    relatedTo:req.params.categoryId, //categoryId is aliased as relatedTo
    task:req.body.task,
    dueDate:req.body.dueDate}
    console.log(222222);
    const task=await Task.create(data)
    
    //increment totalTasks in user schema 
    // console.log(req.user.userId);
    // let a=await User.find({ _id : req.user.userId})
    console.log(3333333);
    // console.log(a,"--------------------");
    res.status(200).json({task});
}
const updateTask=async(req,res)=>{
    const{
        params:{categoryId:relatedTo,taskId:_id},
        body:{task,completed}
    }=req
    if(completed===""){
        throw new BadRequestError("provide task name")
    }
    const updatedTask=await Task.findOneAndUpdate(
        {relatedTo,_id},
        req.body,
        { runValidators: true, new: true }
    )
    if(! updatedTask){
        throw new NotFoundError(`no task with id ${_id}`)
    }
    res.status(200).json({updatedTask})
}
const deleteTask=async(req,res)=>{
    const{
        params:{categoryId:relatedTo,taskId:_id}
    }=req
    const deletedTask=await Task.findByIdAndRemove(
        {relatedTo,_id}
    )
    if(!deleteTask){
        throw new NotFoundError(`no task with id ${_id}`)
    }
    res.status(200).json("Deleted task")
}

module.exports={
    getCategories,createCategory,updateCategory,deleteCategory,
    getTasks,createTask,updateTask,deleteTask
}