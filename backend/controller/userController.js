const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto=require("crypto");

//REgister a user
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"
        },
    });

    sendToken(user,201,res);
});

//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    //checcking if user has given pasword and email both
    if(!email || !password){
        return next(new ErrorHander('Please provide an Email and Password',400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }
   
    sendToken(user,200,res);

});

//logout user
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});

// forgot password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findOne({email:req.body.email});
    // console.log(user);
    if(!user){
        return next(new ErrorHander("User not found",404));
    }
    
    // console.log('reached');
    //get reset password
    const resetToken=user.getResetPasswordToken();
    
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    
    const message=`Your password reset token is :-\n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
    
    console.log('message:',message);
    try{
        console.log(user);
        await sendEmail({
            
            email:user.email,
            subject:"ecommerce password recovery",
            message,
        });
        rse.status(200).json({
            success: true,
            message: `Email sent to ${user.email}  successfully`,
        })
        
    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(err.message,500));
    }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetToken = req.params.token;
    console.log("rsest",resetToken);
    if (!resetToken) {
        return next(new ErrorHander("Reset Password Token is missing", 400));
      }
    
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

      console.log("Token before hashing:", req.params.token);
console.log("Hashed Token:", resetPasswordToken);
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
   console.log("user:",user)
    if (!user) {
      return next(
        new ErrorHander(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
    
      
    console.log("user1")
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
   
    sendToken(user, 200, res);
  });

  //get user detail
  exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });

  });

  // update user passsword
  exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
  
    const user=await User.findById(req.user.id).select("+password");
    console.log("user",user);
    console.log("user id",req.user.id);

    if (!user) {
        return next(new ErrorHander("User not found", 404));
      }
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander('Passwords do not match',400))
    }

    user.password=req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);

  }
  );

  //update user profile
  exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
  
     const newUserData={
        name:req.body.name,
        email:req.body.email,
     }
     //we will add cloudinary later

     const user=await User.findByIdAndUpdate(req.user.id , newUserData,{
        new:true,
        runValidators: true,
        useFindAndModify:false,
     });
     res.status(200).json({
        success:true,
     });
    

  }
  );

  //get all users {admin}
  exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{

    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    });
  })

  //get single user {admin}
  exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander(`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user,
    });
  })

  //update user role -- admin
  
  exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
  
    const newUserData={
       name:req.body.name,
       email:req.body.email,
       role:req.body.role,
    }
    //we will add cloudinary later

    const user=await User.findByIdAndUpdate(req.params.id , newUserData,{
       new:true,
       runValidators: true,
       useFindAndModify:false,
    });
    res.status(200).json({
       success:true,
    });
   

 }
 );

//delete the user role -- admin
 exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findById(req.params.id);
   //we will remove cloudinary later

   if(!user){
    return next(new ErrorHander(`user does not exist with Id: ${req.params.id}`));
   }
   await user.deleteOne();
    res.status(200).json({
       success:true,
       message:"User deleted successfully!"
    });
   

 }
 );

