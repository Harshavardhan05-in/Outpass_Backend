
const express = require('express')

const app = express();
const port = process.env.PORT || 5000;
const Student = require('./model/student');
const Officer = require('./model/officer');
const cors = require('cors')
const bcrypt = require("bcryptjs");

const auth = require('./middleware/auth')

require('./db/conne')

const corOption = {
    origin:"https://outpass-frontend-1adm.onrender.com",
    methods:"POST,PUT,PATCH,GET,HEAD,DELETE",
    credentials:true
}

app.use(cors(corOption));
app.use(express.json());

app.post("/postlogin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userdata = await Officer.findOne({ username });
    if (!userdata) {
      return res.status(404).json({ msg: "INVALID USER" });
    }

    const isCorrectPassword = await bcrypt.compare(password, userdata.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: "NOT AUTHENTICATED" });
    }

    const token = userdata.generateAuthToken();

    console.log(token);
    // ✅ SEND ONLY SAFE FIELDS
    res.status(201).json({
      token,
      username: userdata.username,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});


app.post('/postdata',auth,async(req,res)=>{
    try {
        const newstudent = req.body;
        const resultstudent = await Student(newstudent);
        const result = await resultstudent.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})



app.get('/getdata/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await Student.find({studentId:id});
        console.log(data);
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.put('/modifyallow',auth,async(req,res)=>{
    try {
        const data = req.body;
        const result = await Student.findByIdAndUpdate({_id:data._id},{$set:{isAllowed:true}},{new:true});
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.put('/modifydeny',auth,async(req,res)=>{
    try {
        const data = req.body;
        const result = await Student.findByIdAndUpdate({_id:data._id},{$set:{isAllowed:false}},{new:true});
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.post("/postsec",auth,async(req,res)=>{
    try {
        const data = req.body;
        const newOfficer = new Officer(data);
        const result = await newOfficer.save();
        console.log("RESS:"+res);
        res.status(201).send(result);
    } catch (error) {
        console.log("RESS:"+error);
        res.status(500).send(error);
    }
})

app.get("/getOffData/:id",auth,async(req,res)=>{
    try {
        const id = req.params.id;
        console.log("SEC ID :"+id);
        const off = await Officer.findOne({username:id});
        console.log(off);
        res.status(201).send(off);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.listen(port,()=>{
    console.log("Running on Port Number "+port);
})