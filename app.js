// requirements start
const express = require('express');
const app = express();
const path = require('path');
const itemschema = require('./models/itemmodel')
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser'); 
const { userInfo } = require('os');
const multer = require('multer')
const secret = "sec"
const cors = require('cors');


// requirements

// basic setups start
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'));
app.use(cookie()) 
app.use(cors({
    origin: '*' // OR specify: ['http://127.0.0.1:5500', 'https://yourwebsite.com']
}));
// basic setups


const storage = multer.diskStorage ({
  destination:"./uploads/",
  filename:(req,file,cb)=>{
    cb(null,"img" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage });

app.get('/', async(req, res) => {
  const items = await itemschema.find({})
  res.render('dashboard',{items:items});
});
app.get("/add-item",(req , res)=>{
res.render("additem")
});
app.get("/manage-item", async (req, res) => {
  const item = "xtry122@gmail.com"
  let useritems = await itemschema.find({email: item});
  console.log(useritems);
  res.render("manageitem", {useritems});
})

app.get('/admin/sandeep/khanal', (req, res) => {
  res.render('admin');
});
app.get("/all/data/mongo/db/fetch",async(req, res)=>{
const fetcheditem = await itemschema.find({});
  res.json({ message: "CORS enabled!", fetcheditem: fetchedItems });
})

app.post("/addItem", upload.single("img"),async(req,res)=>{

  console.log(req.file); // Log file details
  console.log(req.body); // Log form data

  if (!req.file) {
      return res.status(400).send("No file uploaded.");
  }

  
    const { email,img,itemname, ingredients, description, quantity, price, address } = req.body;
    const Listeditem =  await new itemschema({
        email: email.toString(),
        img: req.file ? req.file.filename : "",
        itemname,
        ingredients,
        description,
        address,
        quantity,
        price
    });
    await Listeditem.save();
    res.redirect("/manage-item");
})

const port = process.env.PORT || 3000; // Changed port from 3000 to 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
