const express=require('express');

const path=require('path');
const fs=require('fs');
const http=require('http');



const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/', function(req,res){
    fs.readdir(`./files`, function(err,files){
        res.render("index", {files: files});  
    })
    
}) 

app.post('/create', function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`,req.body.info,function(err){
        res.redirect("/");

    })
})

app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename, filedata:filedata});

    })
}) 


app.get('/edit/:filename', function(req,res){
    
        res.render('edit',{filename:req.params.filename});

    
}) 
app.post('/edit', function(req,res){
    
        fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,function(err){
            res.redirect("/");
        });

    
}) 

app.get('/delete/:filename', function(req,res){
    
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        res.render('delete');
      });
})


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('');
  });


const PORT =process.env.Port || 3000;


app.listen(PORT);