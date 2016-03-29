module.exports = function(request, response, next){
  console.log("middleware is executed.");
  next();
}
