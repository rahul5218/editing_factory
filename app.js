const express=require("express");
const request =require("request");
const bodyParser=require("body-parser");
const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
  extended:true
}));




app.get("/",(req,res)=>{
    res.render("home",{result:"",error:"",user:""});
});

app.post("/",(req,res)=>{
    const user=req.body.userId;
    var options = {
        url: `https://api.github.com/users/${user}/repos`,
        headers: {
          'User-Agent': 'request'
        }
      };
    request(options, (err,response,body)=>{
        const ans=JSON.parse(body);
        //console.log(ans);
        if(ans.message==="Not Found"){
            res.render("home",{result:"",error:"No User Found",user:""});
        }else{
            res.render("home",{result:ans,error:"",user:user});
        } 
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);