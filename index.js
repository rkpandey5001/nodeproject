const express=require('express');
const app=express();
const port=8023;
const path=require('path');
const cookieParser= require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
// const MongoStore=require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:"extended",
    prefix:"/css",
}));

app.use(express.urlencoded());
app.use(cookieParser());
//
app.use(express.static('./assets'))
app.use(expressLayouts);


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router

// templet engine
app.set('view engine','ejs');
app.set('views','./views');

// app.get("/signup",function(req,res){
//     // res.render("user_sign_in");
//     console.log("sign up");
// })

app.use(session({
    name:'codeial',
    // Todo change the secret before deployment in production mode
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
//    store:new MongoStore(
//     {
//     mongooseConnection: db,
//     autoRemove:'disabled'
//     },
//     function(err){
//         console.log(err || 'connect mongodb setup ok');
//     }
//    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
        console.log(`Server is running successfully on port :${port}`);
});
