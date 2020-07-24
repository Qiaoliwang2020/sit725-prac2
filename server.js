var express = require('express')
var app = express()

// for hosting static files (html)
app.use(express.static('page_html'))

// add two numbers together
const sum = (n1,n2) => n1 + n2;

// an array where we will keep accounts
let accounts = [
    {id:1,name:'alex',deposit:5},
    {id:2,name:'sarah',deposit:5},
    {id:3,name:'jim',deposit:15}
]


// the node for linked list
function Node(data){
    this.data = data; // the current node data
    this.next = null; // initialization the next node is null
}

// the linkedList constructor
function LinkedList(){
    this.head = null; // initialization the first node
    this.length = 0;  // initialization the linkedList length
}

/**
 * some code of linked list is copy from https://humanwhocodes.com/blog/2019/01/computer-science-in-javascript-linked-list/
 * @type {{get(*): *, add(*=): void}}
 */
LinkedList.prototype = {
    // get data by use `index`
    get(index) {
        // ensure `index` is a positive value
        if (index > -1) {

            // the pointer to use for traversal
            let current = this.head;

            // used to keep track of where in the list you are
            let i = 0;

            // traverse the list until you reach either the end or the index
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;
            }
            // return the data if `current` isn't null or undefined;
            return current !== null ? current.data : undefined;
        } else {
            return undefined;
        }
    },
    // add a data
    add(newData) {
        // create a new node
        let newNode = new Node(newData);

        let current = null;

        // special case: no items in the list yet
        if (this.head == null){
            this.head = newNode;
        }
        // else the new node is the next node
        else {
            current = this.head;
            while (current.next){   // traverse the list until you reach either the end
                current = current.next;
            }
            current.next = newNode;  // assign the node into the `next` pointer
        }
        // update the length of this linkedList
        this.length++;
    }
}

// create a new liked list
let newAccounts = new LinkedList();

// add data to the LinkedList
newAccounts.add({id:1,name:'alex',deposit:5});
newAccounts.add({id:2,name:'sarah',deposit:5});
newAccounts.add({id:3,name:'jim',deposit:15});


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

// retrieves an account from linkedList by index
app.get('/linkedList',function (req,res) {
    const index = req.query.index;
    let data = newAccounts.get(index);
    if(data){
        res.json(data);
        return;
    }else{
        res.send(`data not found`);
    }
})



// liston to the port 3000
app.listen(3000,function () {
    console.log('web server running at: http://localhost:3000')
})