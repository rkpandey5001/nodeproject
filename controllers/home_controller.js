module.exports.home=function(req,res){
    return res.end('<h1>Express is up for codeial</h1>');
}

module.exports.careers=function(req,res){
    return res.end('<h1>you are on careers page</h1>');
}

module.exports.contacts=function(req,res){
    return res.end('<h1>you are on contact page</h1>');
}