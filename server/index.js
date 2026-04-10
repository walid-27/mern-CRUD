const express = require("express");
const app = express();
const cors = require("cors")
const ProductModel = require("./Models/Products")
const mongoose = require("mongoose");
const multer = require("multer");
mongoose.connect("mongodb+srv://usmaali043j_db_user:CGoo6FKbzbX0NzPI@products.2jy0npl.mongodb.net/")
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + "-" + file.originalname);
  },
})

const upload = multer({storage});


app.post("/app-product",upload.single("image"), async (req, res) => {
  try {
    const { description, title, price} = req.body;
      const imageUrl = req.file 
      ? `/uploads/${req.file.filename}`
      : null;

      const product = new ProductModel({
        title,
        price,
        description,
        image: imageUrl,
      })
     await product.save() 

       res.status(201).json({
        message: "Product created",
        product,
      });
  }
   catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products", async (req, res)=>{
  try{
    const products = await ProductModel.find({});
    res.status(200).json(products);
  }catch(err){
    res.json(500).json({message: err.message});
  }
})
/////

app.patch("/products/:id",upload.single("image"), async (req, res) => {
    try{
      const UpdateData = req.body;

      if(req.file){
        UpdateData.image = `/uploads/${req.file.filename}`;
      }

      const UpdateProducts = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {$set : UpdateData},
        {new: true}
      );

      res.status(200).json(UpdateProducts)
    }catch(err){
      res.status(500).json({messsage: err.message});
    }
  }
);

app.listen(8000, console.log("agree"))