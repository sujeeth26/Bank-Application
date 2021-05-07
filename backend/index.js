const mongoose = require("mongoose");
const express=require("express");
const app=express();
const cors=require("cors");
const userroute=require("./routes/customer");
const tranxroute=require("./routes/tranx");


//DB Connection
mongoose
  .connect("mongodb://localhost:27017/Banking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(()=>{
      console.log("failed to connect db");
  });
  
  app.use(cors());
  app.use(express.json());                      //mw  express->[routes]->error
 
  app.use('/api', userroute);
  app.use('/api', tranxroute);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});