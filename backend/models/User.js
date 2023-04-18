const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter name'],
        minlength:3,
        maxlength:30,
        unique:[true,'Username already exits']
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        match: [/^([a-zA-Z\.!#$%^&*]+[0-9]*)+@[a-z]+.(com|us|in|net)$/,
            'please provide a valid email'
        ],
        unique: [true, 'Email already exists']
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    totalTasks:{
        type:Number,
        default:0
    },
    completedTasks:{
        type:Number,
        default:0
    }
})

//premiddleware
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

//instance methods
userSchema.methods.createJwt=function(){
    console.log(this.username,this.email,this.password);
    return jwt.sign({
        userId:this._id,
        name:this.username
    },process.env.JWT_SECRET)
}

userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
module.exports=mongoose.model("User",userSchema)