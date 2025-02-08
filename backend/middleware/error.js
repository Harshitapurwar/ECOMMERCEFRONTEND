const ErrorHander=require("../utils/errorhander");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server error";
    

    //Wrong Mongodb Id error
    if(err.name=="CastError"){
        const message=`REsource not found. Invalid: ${err.path}`;
        err=new ErrorHander(message,400);
    }
/// mongoose duplicate key error
   if(err.code === 11000){
    const message = `Duplicate field value entered ${Object.keys(err.keyValue)} in the database`;
    err=new ErrorHander(message,400);
   }
   //wrong jwt error
   if(err.name=="CastError"){
    const message=`REsource not found. Invalid:try again`;
    err=new ErrorHander(message,400);
}

//jwt expire
if(err.name=="TokenExpiredError"){
    const message=`REsource not found. Invalid: try again`;
    err=new ErrorHander(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};