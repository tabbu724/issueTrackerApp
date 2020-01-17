let errorHandler =(err,req,res,next)=>{
console.log('error handler middleware called');
console.log(err);
res.send('Some error occurred');
}

let notFoundHandler=(req,res,next)=>{
    console.log('not found middleware called');
    res.status(404).send('Route not found');
}
module.exports={
    errorHandler:errorHandler,
    notFoundHandler:notFoundHandler
}