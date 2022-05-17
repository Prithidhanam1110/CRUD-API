const express = require('express');
const app=express();
app.use(express.json());
app.listen(3003,()=>{
    console.log("Server started")
})
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri="mongodb+srv://prithi0306:iPxOmujnlQm4QSfH@cluster0.yggty.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  // perform actions on the collection object  
  if(err){
      throw new Error(err);
  }
 console.log("Db connected successfully")
});

app.get("/",function(req,res){
    client.db('sample_mflix').collection('data').find({})
    .project({title:1,description:1,_id:0}).toArray(function(err,data){
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})
app.post("/insert",function(req,res){
    var title= req.body.title;
    var description= req.body.description;
    var isDone = req.body.isDone;
    var isActive = req.body.isActive;
    var createdAt = req.body.createdAt;
    var updatedAt = req.body.updatedAt;
    client.db('sample_mflix').collection('data').insertOne({
        title,
        description,
        isDone,
        isActive,
        createdAt,
        updatedAt
    })
    .then((success)=>{
        res.send(success)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.post("/many",function(req,res){
    var title= req.body.title;
    var description= req.body.description;
    var isDone = req.body.isDone;
    var isActive = req.body.isActive;
    var createdAt = req.body.createdAt;
    var updatedAt = req.body.updatedAt;
    client.db('sample_mflix').collection('data').insertMany(
        [
            {
                title :"jilla",
                description:"jilla is a wonderful movie",
                isDone: "true",
                isActive:"false",
                createdAt: "05-03-1999",
                updatedAt: "03-10-2015"
            },
            {
                title :"premam",
                description:"premam is a wonderful movie",
                isDone: "true",
                isActive:"false",
                createdAt: "05-03-1999",
                updatedAt: "03-10-2015"
            },

            
        ]
    )
    .then(()=>{
        res.send("Successfully Inserted")
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.delete("/delete/:id",function(req,res){
    console.log(req.params.id)
    client.db('sample_mflix').collection('data').deleteOne({
     _id:new ObjectId(req.params.id)
    })
    .then((success)=>{
        res.send(success)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.delete("/delmany/:id",function(req,res){
    console.log(req.params.id)
    client.db('sample_mflix').collection('data').deleteMany({
        description:"task"
    })
    .then((success)=>{
        res.send(success)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.post("/update",function(req,res){
    var title= req.body.title;
    var description= req.body.description;
    var isDone = req.body.isDone;
    var isActive = req.body.isActive;
    var createdAt = req.body.createdAt;
    var updatedAt = req.body.updatedAt;
    client.db('sample_mflix').collection('data').findOneAndUpdate({title:"preethilkfghkdfhgkjdfhkhdfjgkhdjfkghdjf"},{$set:{title:"beast"}})
    .then((success)=>{
        res.send("successfully updated")
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.post("/upmany",function(req,res){
    var title= req.body.title;
    var description= req.body.description;
    var isDone = req.body.isDone;
    var isActive = req.body.isActive;
    var createdAt = req.body.createdAt;
    var updatedAt = req.body.updatedAt;
    client.db('sample_mflix').collection('sessions').updateMany({description:"task"},{$set:{description:"1234567.abcdef"}})
    .then((success)=>{
        res.send("successfully updated")
    })
    .catch((err)=>{
        res.send(err)
    })
})