💡 What is Express.js?
🧑‍🏫 Tanglish Explanation:

Express.js na –
Node.js‑ku oru shortcut framework.
Server create panna, routing panna, response kodukka romba easy‑ah help pannudhu.

✅ Simple‑ah sollanum na:

"Node.js server‑ah fast‑ah build panna shortcut framework"

// install command
npm install express --save

Middleware na –
"Request browser‑la irundhu vandhadhum, response send panna munnadi nadakkara function."

| Feature             | Node.js               | Express.js                        |
| ------------------- | --------------------- | --------------------------------- |
| Server create       | `http.createServer()` | Just `express()` & `app.listen()` |
| Routing             | Manual `if(req.url)`  | Easy `app.get()`                  |
| Headers, end, write | Manual                | `res.send()` is enough ✅          |
| Middleware          | No                    | Yes ✅                             |


app.use() na –
"Browser request vandha udane, first check panna or run panna oru function."

| Code                        | Meaning                                  |
| --------------------------- | ---------------------------------------- |
| `res.send('text')`          | Send plain text                          |
| `res.send('<h1>HTML</h1>')` | Send HTML to browser                     |
| `res.send({})`              | Send JSON (API style)                    |
| Auto end                    | No need to call `res.end()` separately ✅ |

//code
const express=require('express');//express js use
const app=express();// express is a function

app.use((req,res,next)=>{
console.log("first Middleware");
next();  //go to next middleware ithu tara la na next middleware povathu
})
app.use((req,res,next)=>{
console.log("second Middleware");
next();
})
app.use((req,res,next)=>{
console.log("third Middleware");
res.send("<h1>hello every one</h1>"); //responce send it ,Sets Content-Type automatically (text, HTML, JSON etc.),Ends the response (no need to write res.end())
})
app.listen(2000); //erver start pannudhu on port 2000

//hiding diferent url 


const express=require('express');
const app=express();// 

app.use('/',(req,res,next)=>{       //this path this response
console.log("first Middleware");    //home page midddle ware always run first next middle ware not work  how to solve give home middle ware always last problem solve
res.send("<h1>First page</h1>")
 
})

app.use('/second'(req,res,next)=>{   //this path this response
console.log("second Middleware");
res.send("<h1>second page</h1>")
})

app.listen(2000);

//Body parser

intall comment npm install body-parser

 body-parser is a middleware that helps us read data sent from the client, like form data or JSON.
body-parser use pannina, user form data vaanga easy-a aagum!

🧠 Without body-parser:
req.body will be undefined.
You cannot access what the user typed in a form or sent as JSON.

body-parser use panna, neenga client send pannra data (form, JSON) req.body la easy-a eduka mudiyum 

Purpose	What it does
body-parser.urlencoded()	Parses data from HTML forms (x-www-form-urlencoded)
body-parser.json()	Parses JSON data from client

const express= require('express');
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded())

app.use('/add-product',(req,res,next)=>{   //this path this response
res.send("<h1>Add product</h1> <form action="/store-product" method="POST"><input type="text" name="title"/><input type="submit" value="submit"/></form>")
})
app.use('/store-product',(req,res,next)=>{   //this path this response
console.log('Form data':,req.body);
})

app.listen(2000)

// post and get request

//get request 
👉 Data browser-la URL-la change it responce change like /product or /home type change response
👉 Example: You visit a website or search in Google
👉 Used to get data from server

//post request
👉 Used to send data (like form, login)
👉 not change url name change responce change
👉 only for post request responce show

const express= require('express');
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded())

app.get('/add-product',(req,res,next)=>{   //this path only get this response
res.send("<h1>Add product</h1> <form action="/store-product" method="POST"><input type="text" name="title"/><input type="submit" value="submit"/></form>")
})
app.post('/store-product',(req,res,next)=>{   //this path only post this response
console.log('Form data':,req.body);
})

app.listen(2000)

//express router

👉 Router na oru mini Express app.
👉 It helps to organize routes cleanly and split code into files.

project/
│
├── app.js               ← Main app
├── routes/
│   ├── adminjs.js       ← Product routes
│   └── shop.js          ← User routes

//app.js
const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const adminRoutes=require("./routes/admin");
const shopRoutes=require("./routes/shop");

app.use(adminRoutes);
app.use(shopRoutes);
app.use(bodyParser.urlencoded())
app.listen(2000)

//admin.js
const express=require('express');
const router =express.Router();
router.get('/add-product',(req,res,next)=>{   //this path only get this response
res.send("<h1>Add product</h1> <form action="/store-product" method="POST"><input type="text" name="title"/><input type="submit" value="submit"/></form>")
})
router.post('/store-product',(req,res,next)=>{   //this path only post this response
console.log('Form data':,req.body);
res.send("<b>product submitted </b>")
})
module.exports=router;

//shop.js
const express=require('express');
const router =express.Router();

router.get('/',(req,res,next)=>{   //this path only post this response
res.send("<b>welcome message </b>")
})
module.exports=router;

//showing 404 error
*incase user type wrong path name show this message 404 page not found
*same prevous same code
--app.js change this

app.use(adminRoutes);
app.use(shopRoutes);
app.use(bodyParser.urlencoded())
app.use((req,res,next))=>{
 res.status(404).send("<h1>404 page not found</h1>");//add this line thats all
}
app.listen(2000)

//filtering router
*its a like path name
 admin/add-product
admin/store-product
* its the first path name same admin incase your boss change another name you change manually its hard because lot of roter use
*this method solve this just one place put name control all path name
--app.js just change this prievous same code 

app.use('/admin',adminRoutes);  // this line add all the path automatically put

--admin.js just change this prievous same code 

res.send("<h1>Add product</h1> <form action="http://localhost:300/admin/store-product" method="POST"><input type="text" name="title"/><input 

📁 path module na enna? (in Express.js)
👉 path is a built-in Node.js module
👉 It helps to work with file & folder paths safely
👉 main use html file ahh respond ahh send pannu rathu

🤔 Why use in Express?
👉 When you want to send HTML files, you need correct file path
👉 Windows, Linux la path separator (/, \) different
👉 path module handles that automatically! ✅

path module use pannina, file path‑a safe‑aa, OS‑ku match‑aa set panna mudiyum.

| Code Part              | Meaning                                          |
| ---------------------- | ------------------------------------------------ |
| `path.join(...)`       | Correct‑aa file path create pannum (OS-friendly) |
| `__dirname`            | Ithu current file oda folder path                |
| `'views', 'home.html'` | `'views/home.html'` nu kidaikum                  |
| `res.sendFile(...)`    | Oru file‑a browser‑ku anupum                     |
| ..                     | .. → back (one step) from current folder         |

//first create folder like this structure

expressjsfolder
routes folder
admin.js
shop.js
view folder
add-product.html
shop.html
app.js

//shop.js

const express=require('express');
const path=require(path);  //path module
const router =express.Router();

router.get('/',(req,res,next)=>{   
res.sendFile(path.join(__dirname,'..','views','shop.html')) //res send file 
})
module.exports=router;    
                         //dir namr is variable contain c drive to this folder rotes folder vara contain pannum then 
                         //   '..' one level back rote folder to viwes ku extend it 
                         // dir name which folder that folder is a root folder ,'..' this is some this use some time not use

//add-product.html

<html>
<head> <title>app</title> </head>
<body>
<header>
<nav>
<ul>
<li><a> href="/">shop</a></li>
<li><a href="/add-product">add product</a></li>
</ul>
</nav>
</header>
<main>
<form action="/add-product" method="POST">
<input> type="text" name="title"/>
<button type="submit"> add product</button>
</form>
</main>
</body>
</html>

//shop.html

<html>
<head> <title>app</title> </head>
<body>
<header>
<nav>
<ul>
<li><a> href="/">shop</a></li>
<li><a href="/add-product">add product</a></li>
</ul>
</nav>
</header>
<main>
  <h1>products</h1>
  <p>list of all products...</p>
</main>
</body>
</html>

//404 send file not message
--appjs just alter add this

app.use((req,res,next))=>{
 res.status(404).sendFile(path.join(__dirname,'views','404.html'));
}
app.listen(2000)

// create 404.html file

<h1>404 page not found</h1>
<p> please check the url is correct </p>

//create utils one folder inside path.js
//this is only for easyly root directry path get 

//path.js

const path= require('path');
const rootDir=path.dirname(require.main.filename);    // Ithu main file full path return pannum 👉 Example: If you run node app.js in case main file name change ana kuda 
module.exports=rootDir

// shop.js

const express=require('express');
const path=require(path);  //path module
const rootDir=require("../utils/path")
const router =express.Router();

router.get('/',(req,res,next)=>{   
res.sendFile(path.join(rootDir,'..','views','shop.html')) //res send file 
})
module.exports=router; 

//admin.js

const express=require('express');
const path= require("path");
const rootDir=require("../utils/path");
const router =express.Router();
router.get('/add-product',(req,res,next)=>{   //this path only get this response
res.sendFile(path.join(rootDir,"views","add-product.html"))
})
router.post('/store-product',(req,res,next)=>{   //this path only post this response
console.log('Form data':,req.body);
res.send("<b>product submitted </b>")
})
module.exports=router;

//styling html page express js

*type1 is internal css using inside html regular pattern
*type2 is external css using different slightly using static files

express.static use pannina, neenga browser‑ku CSS / image / JS files patha open panna permission kudukura mathiri 😎

Without this line ❌:
If your HTML file links to /style.css, browser won’t find the file.

It will say: "404 not found" ❌

so use this line 
app.use(express.static(path.join(__dirname,'public'))) //"public" is a static file contain folder name you give name vicky give vicky

| File Type      | Example                   |
| -------------- | ------------------------- |
| 🖌️ CSS        | `style.css` (styling)     |
| 🖼️ Images     | `logo.png`, `photo.jpg`   |
| 🎭 JS (client) | `script.js` (frontend JS) |
| 📄 Fonts       | `.ttf`, `.woff` files     |
| 🎧 Media       | `.mp3`, `.mp4`, etc.      |


type 1 is using style tag example addd-product.html uswal method
type 2
* is a create folder name it public and inside create css folder 
style.css give css code inside this file
*then which html file style give head tag link exxternal css like this 
<link rel="stylesheet" href="css/style.css">
*app.js give this
app.use(express.static(path.join(__dirname,'public'))) add this line app.js routes mela tarunum i mean first app.use tarunum

🌟 upolode image express js

*first learn templating engines mainly ejs after come this part

//install
npm i multer    //this for file uplode package middleware

//project structure

project/
│
├── index.js
├── uploads/         ← create manually (or use fs to auto-create)
└── views/
    └── signup.ejs   ← simple upload form

//index.js

// Required modules import
const express = require('express');  // Express framework
const app = express();               // Express app create
const path = require('path');        // Path module for file/folder paths
const multer = require('multer');    // Multer for file uploads
const { log } = require('console');  // For console logging

// EJS view engine setup
app.set('views', path.join(__dirname, "views"));  // View files folder set pannuthu
app.set('view engine', "ejs");                    // View engine set as EJS

// -------- Multer storage setup start -------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Upload panna file epdi enna folder ku save pannanum nu path
        cb(null, 'uploads'); // Files save in uploads folder
    },
    filename: function (req, file, cb) {
        // Filename epdi save aganum nu logic
        cb(
            null,
            file.originalname.replace(/\.[^/.]+$/, "") + // Original filename (dot ellam cut panni)
            '_' +
            Date.now() +                                 // Timestamp add pannuthu
            path.extname(file.originalname)              // Extension (e.g. .jpg)
        );
    }
});
// -------- Multer storage setup end --------------

// Max size for upload file (2 MB)
let maxSize = 2 * 1000 * 1000;

// Multer configuration
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize // File size limit 2MB
    },
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype); // Print mime type in console

        // Allowed file types: jpg, jpeg, png
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype); // Check mime type
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check extension

        // Both mimetype and extension correct ah irundha → allow
        if (mimetype && extname) {
            return cb(null, true);
        }

        // Wrong file type na → error return
        cb("Error: File upload only supports the following filetypes: " + filetypes);
    }
}).single('mypic'); // Form la irukka input name = "mypic"

// Route: Home page (GET method)
app.get('/', (req, res) => {
    res.render('signup'); // signup.ejs file render pannu
});

// Route: Upload image (POST method)
app.post('/upload', (req, res, next) => {
    // Multer upload function call
    upload(req, res, function (err) {
        if (err) {
            // MulterError: file size > 2mb
            if (err instanceof multer.MulterError && err.code == "LIMIT_FILE_SIZE") {
                return res.send("File size is maximum 2mb");
            }

            // Other error
            res.send(err);
        } else {
            // Success message
            res.send("Success. Image Uploaded!");
        }
    });
});

// Server start at port 8080
app.listen(8080, () => {
    console.log(`Server is Running`);
});


//singnup.ejs

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding UTF-8 for special characters support -->
    <meta charset="UTF-8">
    
    <!-- For compatibility with Internet Explorer -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Responsive design support for mobile and desktop -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page title (tab la kaatum) -->
    <title>JVLcode Fileupload in Node.js</title>
</head>
<body>
    <!-- Page main heading -->
    <h1>Single Fileupload</h1>

    <!-- Form to upload file -->
    <!-- method="POST" → backend ku data send pannanum -->
    <!-- action="/upload" → form submit panna /upload route ku pogum -->
    <!-- enctype="multipart/form-data" → file upload panna must add this -->
    <form method="POST" action="/upload" enctype="multipart/form-data">
        
        <!-- Label for file input -->
        <span>Upload Single File</span>
        
        <!-- File input box -->
        <!-- name="mypic" → backend multer la same name use pannirukkanum -->
        <input type="file" name="mypic" required><br>
        
        <!-- Submit button -->
        <input type="submit" value="submit">
    </form>
</body>
</html>


🧠 Templating Engine na enna?
👉 It's a tool that helps you create dynamic HTML pages easily.
HTML page‑la JavaScript code, loops, variables use panna help pannum.

| Name       | Extension | Style         |
| ---------- | --------- | ------------- |
| EJS        | `.ejs`    | HTML + JS     |
| Pug        | `.pug`    | Indented HTML |
| Handlebars | `.hbs`    | HTML + `{{}}` |

🌟 What is EJS?
EJS (Embedded JavaScript Templates) is a templating engine that lets you write HTML + JS together.
Use res.render() to show dynamic pages like product list, user name, etc.
project/
├── app.js
├── views/
│   └── home.ejs

🧱 1. Install EJS
npm install ejs

🔧 2. app.js Code:
const express = require('express');
const path = require('path');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home', { name: 'Vicky' });  // Send data to EJS
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

🧾 3. views/home.ejs
<!DOCTYPE html>
<html>
<head>
  <title>Welcome</title>
</head>
<body>
  <h1>Hello <%= name %> 😎</h1>
  <p>This is a dynamic EJS page</p>
</body>
</html>
🧠 Syntax of if else in EJS:
Inside .ejs file, we use:

<% if (condition) { %>
   <!-- HTML when true -->
<% } else { %>
   <!-- HTML when false -->
<% } %>

✅ <% %> – logic
✅ <%= %> – value display

1. In app.js
app.get('/', (req, res) => {
  res.render('home', { isLoggedIn: true, username: "Vicky" });
});
2. In views/home.ejs
<!DOCTYPE html>
<html>
<head>
  <title>Home Page</title>
</head>
<body>
  <% if (isLoggedIn) { %>
    <h1>Welcome, <%= username %>!</h1>
  <% } else { %>
    <h1>Please login to continue.</h1>
  <% } %>
</body>
</html>

🟢 Output:
If isLoggedIn = true:
👉 Welcome, Vicky!

If isLoggedIn = false:
👉 Please login to continue.

✅ Example: Display Product List
1. In app.js
js
Copy code
app.get('/', (req, res) => {
  const products = ['Pen', 'Book', 'Laptop'];
  res.render('home', { items: products });
});
2. In views/home.ejs
html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Product List</title>
</head>
<body>
  <h1>All Products</h1>

  <ul>
    <% items.forEach(product => { %>
      <li><%= product %></li>
    <% }) %>
  </ul>
</body>
</html>
🟢 Output:
Pen

Book

Laptop

💡 Another Example (Object List):
app.js
js
Copy code
const products = [
  { name: 'Pen', price: 10 },
  { name: 'Book', price: 50 }
];
res.render('home', { items: products });
home.ejs
html
Copy code
<ul>
  <% items.forEach(p => { %>
    <li><%= p.name %> - ₹<%= p.price %></li>
  <% }) %>
</ul>
🗣️ Tanglish Summary:
EJS‑la forEach use panni array‑la iruka item‑a HTML‑la display panna mudiyum.
List, card, table lam loop‑la show panna use pannuvom.

❓ What is Handlebars?
Handlebars (hbs) is a templating engine like EJS.

👉 Server‑la iruka data‑a HTML‑la dynamic‑ah display panna use panrom.
👉 Example: User name, product list, message.

✅ How to Setup hbs in Express.js

🔧 Step 1: Install
npm install hbs

🔧 Step 2: In app.js

const express = require('express');
const app = express();

app.set('view engine', 'hbs'); // Use hbs
app.set('views', './views');   // Views folder

app.get('/', (req, res) => {
  res.render('home', { name: 'Vicky' });  // send data
});

app.listen(3000, () => {
  console.log('Server running');
});
📄 Step 3: Create views/home.hbs

html
<!DOCTYPE html>
<html>
<head>
  <title>Home Page</title>
</head>
<body>
  <h1>Hello, {{name}}! 🧠🔥</h1>
</body>
</html>

🟢 Output:
Hello, Vicky! 🧠🔥

| Purpose       | Syntax      | Example                                       |
| ------------- | ----------- | --------------------------------------------- |
| Display value | `{{value}}` | `{{name}}`                                    |
| If condition  | `{{#if}}`   | `{{#if loggedIn}} Hi {{/if}}`                 |
| Loop          | `{{#each}}` | `{{#each items}} <li>{{this}}</li> {{/each}}` |

💡 Example 1: Show message if logged in
🔧 In app.js

app.get('/', (req, res) => {
  res.render('home', { loggedIn: true });
});
📄 In views/home.hbs
<h1>Welcome!</h1>

{{#if loggedIn}}
  <p>You are logged in ✅</p>
{{else}}
  <p>Please log in 🔒</p>
{{/if}}

🟢 Output:
If loggedIn: true → "You are logged in ✅"
If loggedIn: false → "Please log in 🔒"

✅ Syntax of each

{{#each arrayName}}
   {{this}}        ← Current item
{{/each}}
💡 Example: Product List
🔧 In app.js

app.get('/products', (req, res) => {
  const productList = ['Laptop', 'Phone', 'Tablet'];
  res.render('products', { items: productList });
});
📄 In views/products.hbs

<h2>Product List</h2>
<ul>
  {{#each items}}
    <li>{{this}}</li>
  {{/each}}
</ul>
🟢 Output:
Product List
- Laptop
- Phone
- Tablet

💡 Pug na enna?
👉 Pug is a templating engine like EJS and Handlebars.
👉 Difference: Pug no need tags like <h1> <div>. It uses indentation (tab/space).
👉 Easy & fast to write clean HTML.

✅ Step-by-step Setup Pug in Express
🛠️ Step 1: Install Pug
npm install pug

🛠️ Step 2: Setup in app.js
const express = require('express');
const app = express();

app.set('view engine', 'pug');       // use pug
app.set('views', './views');         // views folder

app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome Vicky', message: 'You are learning Pug!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

📄 Step 3: Create views/home.pug
//- no HTML tags, just indentation

html
  head
    title= title
  body
    h1= message
    p This is a pug page. Super clean!

🟢 Output:

Welcome Vicky
You are learning Pug!
This is a pug page. Super clean!

💡 Example: Login status

🔧 In app.js

app.get('/', (req, res) => {
  res.render('home', { loggedIn: true });
});

📄 In views/home.pug

html
  head
    title Home
  body
    h1 Welcome!

    if loggedIn
      p ✅ You are logged in
    else
      p 🔒 Please log in

🟢 Output:

If loggedIn: true → "✅ You are logged in"
If false → "🔒 Please log in"

✅ Syntax: each in Pug
each item in arrayName
  // use item
💡 Example 1: Simple List
🔧 In app.js
js
Copy code
app.get('/', (req, res) => {
  const fruits = ['Apple', 'Banana', 'Mango'];
  res.render('home', { fruits });
});

📄 In views/home.pug

html
  head
    title Fruit List
  body
    h2 My Fruits:
    ul
      each fruit in fruits
        li= fruit
🟢 Output:

My Fruits:
- Apple
- Banana
- Mango
💡 Example 2: Object List

🔧 In app.js

app.get('/', (req, res) => {
  const users = [
    { name: 'Vicky', age: 21 },
    { name: 'Vidhya', age: 20 }
  ];
  res.render('users', { users });
});

📄 In views/users.pug

html
  body
    h2 User List:
    ul
      each user in users
        li #{user.name} - Age: #{user.age}
🗣️ Tanglish Summary:
each na for loop mathiri.
li= fruit — value show pannuvom
#{user.name} — inside string use panna like template

💡 MVC-na enna?
M - Model
V - View
C - Controller

It’s a structure to build and manage clean web applications.

🧠 Tanglish Explanation:
Part	Role	Example
Model	Data & logic	Product details, DB connection
View	UI (User Interface)	HTML/EJS/Pug page
Controller	Brain → controls flow	Handle request, send data to view

🔄 MVC Flow in Express.js:
User hits route → like /products

Router sends to Controller

Controller gets data from Model

Controller sends data to View

View shows output to user (HTML)

📁 Folder Structure Example:

project/
│
├── app.js
├── controllers/
│   └── productController.js
├── models/
│   └── product.js
├── views/
│   └── product.ejs
├── routes/
│   └── productRoutes.js
✅ Simple Explanation:
🧠 Controller → Handles request (addProduct, getProducts)
📦 Model → Stores product data
🖥️ View → Renders product page using template

🗣️ Tanglish Summary:
MVC use pannaa, code clean‑aa split aagum.
Data (Model), Logic (Controller), UI (View) separate irukkum.
Easy to maintain and scale web apps.
