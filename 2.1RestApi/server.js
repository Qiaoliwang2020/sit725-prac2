var express = require('express')
var app = express()

// for hosting static files (html)
app.use(express.static('page_html'))

// add two numbers together
const sum = (n1,n2) => n1 + n2;

// where we will keep accounts
let accounts = [
    {id:1,name:'alex',deposit:5},
    {id:2,name:'sarah',deposit:5},
    {id:3,name:'jim',deposit:15}
]

// display the result in the page.
app.get('/adder',function (req,res) {
    let num1 = parseInt(req.query.n1),
        num2 = parseInt(req.query.n2),
        result = sum(num1,num2);
    res.send(`The result is ${result}`)
})

// retrieves an account from accounts by id
app.get('/accounts/:id',function (req,res) {

    const id = req.params.id;

    for (let account of accounts){

        if (account.id == id){
            res.json(account);
            return;
        }
    }
})


// liston to the port 3000
app.listen(3000,function () {
    console.log('web server running at: http://localhost:3000')
})