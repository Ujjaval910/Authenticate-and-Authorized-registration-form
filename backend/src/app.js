const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const register = require("./models/registers");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) =>{
    res.render("register");
});

app.get("/login", (req, res) =>{
    res.render("login");
});

app.post("/register", async (req, res) =>{
    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password=== cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                DoB: req.body.DoB,
                password: password,
                confirmpassword: cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("password are not matching.")
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async(req, res) =>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        res.send(useremail);
        console.log(useremail);

        if(useremail.password===password){
            res.status(201).render("index");
        } else{
            res.send("password are not matching");
        }

    } catch{
        res.status(400).send("invalid email");
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})