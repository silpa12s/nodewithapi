

const express=require("express")
const mongoose=require("mongoose")

const Product = require("./modals/productModal");
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
//routes

app.get('/',(req,res)=>{
    res.send("hello node")
})

app.get("/blog", (req,res)=>{
    res.send("this is new my blog ")
})

//get data

app.get('/products',async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//

app.post("/product",async (req,res)=>{
   try {
    const product=await Product.create(req.body)
    res.status(200).json(product)
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
   }
})


//update/edit

app.put('/products/:id', async(req,res)=>{
    try {
        const{id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        //we cannot find any product in database
        if(!product){
            return res.status(404).json({message:`cannot find product with ID ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct);
        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//delete a product
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
          return  res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.json(500).json({message:error.message})
    }
})

// mongoose.set("strictQuery",false)
mongoose.connect("mongodb+srv://silpa12sss:api12@cluster0.wucmlbx.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    console.log(" Database Connected to mongodb!");

    app.listen(4000,()=>{
        console.log("Node server is running");
        
    })
    
    
}).catch((error)=>{
    console.log(error);
})

//api12