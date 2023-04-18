const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:[true,'Enter task name']
    },
    dueDate:{
        type:Date,
        // required:[true,"Enter due date"]
    },
    completed:{
        type:Boolean,
        default:false
    },
    relatedTo:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:[true,'Please provide category']
    }
})

module.exports=mongoose.model("Task",taskSchema);