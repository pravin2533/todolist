const express=require("express");
const app=express();
app.set('view engine', 'ejs');
const mongoose=require("mongoose")
const bodyParser=require("body-parser");
const date=require(__dirname +"/date.js");
//console.log(date());

app.use(express.static(__dirname + "/public"));

const https=require("https");

// var items=["buy food","cook food","get food"];
// let workitems=[];
// let work="";
// let route="";

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://pravin:Pass%40123@cluster0.2dpmx1d.mongodb.net/item", {
  useNewUrlParser: true
});

console.log("connected to mongodb")

const itemSchema=mongoose.Schema({
  name:String,
})

const collection=mongoose.model("item",itemSchema);
const item1=new collection({
  name:"product1",
})
const item2=new collection({
  name:"product2",
})
const defaulltitems=[item1,item2]
collection.insertMany([item1,item2])

  console.log("successfully added");


app.get("/", async function(req,res)
{

  const dataitems=await collection.find({}).exec();
  let currday=date.getdate()//here we calling the exported value
  // if function is stored in exported value then "()"is important while calling

  res.render("list",{kindofday:currday,newlistitems:dataitems,route:"/"});

});

//here we create another get request for a work route sending route
app.get("/work",function(req,res)
{
  res.render("list",{kindofday:"worklist",newlistitems:workitems,route:"/work"})
})
//res.render go to the folder views where ejs files are saved and run that file


app.post("/work",function(req,res)
{
    work=req.body.newitem;
    workitems.push(work);
    res.redirect("/work");
})

app.get("/about",function(req,res)
{
  res.render("about");
})
//about page is created for seeing a layout property




app.post("/",function(request,response)
{
   const item=new collection({name:request.body.newitem})
  item.save();
  //console.log(res);
  //response.send(res +" successfully submitted");
  response.redirect("/");//for get back in home route

})
app.get("/:listname",async function(req,res){
  try
  {
    const listname=req.params.listname;
    const listSchema=await mongoose.Schema({
      name:String,

    })
    const itemlist=await mongoose.model("list",itemSchema);
    const item_list=new itemlist({
      name:listname,

    })
    item_list.save();
    const array=await itemlist.find({}).exec();
    res.render("list",{kindofday:item_list.name,newlistitems:array,route:"/"})
  }
  catch(err)
  {
    console.log("new page cannot be created")
  }
})

app.post("/delete",async function(req,res){
  const deleteditem=req.body.checkbox;
  console.log(deleteditem)
  try
  {
  await collection.findOneAndDelete({_id:deleteditem})
}
catch(err)
{
  console.log("there is an error in deleting the item")
}
  console.log("deleted successfully")
  res.redirect("/")
})

let port=process.env.PORT;
if(port==null || port=="")
{
  port=3000;
}



app.listen(port,function(){
  console.log("server is running on port 3000");
})
